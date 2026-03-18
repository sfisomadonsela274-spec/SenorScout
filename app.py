import base64
from io import BytesIO

import uvicorn
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from PIL import Image
from pydantic import BaseModel
from ultralytics import YOLO

from scraper import average_price, fetch_sold_listings, get_appraisal

app = FastAPI(
    title="SenorScout API",
    description="AI-Powered Price Scanner - Detect objects and get real-time price estimates",
    version="1.0.0",
)

# Configure CORS
origins = [
    "*",  # Allows all origins for development
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["GET", "POST"],
    allow_headers=["*"],
)

# Load YOLOv8 model
print("Loading YOLO model...")
model = YOLO("yolov8n.pt")
model.to("cpu")
print("YOLO model loaded successfully")


class KeywordRequest(BaseModel):
    keyword: str


class ImageRequest(BaseModel):
    image_base64: str


@app.get("/")
async def root():
    """Root endpoint with API information."""
    return {
        "name": "SenorScout API",
        "version": "1.0.0",
        "description": "AI-Powered Price Scanner",
        "endpoints": {
            "/": "This info",
            "/docs": "API Documentation",
            "/scrape": "Search prices by keyword",
            "/detect_and_appraise": "Detect objects and get price estimates",
            "/appraise": "Get detailed price appraisal from multiple sources",
        },
    }


@app.post("/scrape")
async def scrape_listings(request: KeywordRequest):
    """
    Fetches sold listings for a given keyword and calculates the average price.
    Uses eBay sold listings (legacy endpoint).
    """
    try:
        listings = fetch_sold_listings(request.keyword)
        if not listings:
            return {"message": "No sold listings found.", "keyword": request.keyword}

        avg_price, currency = average_price(listings)

        return {
            "keyword": request.keyword,
            "num_listings": len(listings),
            "listings": [
                {"price": price, "currency": currency_sym}
                for price, currency_sym in listings
            ],
            "average_price": round(avg_price, 2) if avg_price else 0,
            "currency": currency,
        }
    except Exception as e:
        print(f"Error in /scrape: {e}")
        raise HTTPException(status_code=500, detail=str(e))


@app.post("/appraise")
async def appraise_item(request: KeywordRequest):
    """
    Get detailed price appraisal from multiple sources (Amazon, eBay, Craigslist).
    Returns comprehensive statistics including average, median, and per-source breakdown.
    """
    try:
        appraisal = get_appraisal(request.keyword)

        if appraisal["total_listings"] == 0:
            return {
                "message": f"No price data found for '{request.keyword}'",
                "keyword": request.keyword,
                "success": False,
            }

        return {
            "keyword": request.keyword,
            "success": True,
            "total_listings": appraisal["total_listings"],
            "overall_average": appraisal["overall_average"],
            "overall_median": appraisal["overall_median"],
            "price_range": appraisal["price_range"],
            "sources": appraisal["sources"],
        }
    except Exception as e:
        print(f"Error in /appraise: {e}")
        raise HTTPException(status_code=500, detail=str(e))


@app.post("/detect_and_appraise")
async def detect_and_appraise(request: ImageRequest):
    """
    Detects objects in an image using YOLOv8 and then appraises them
    using the multi-source scraper.
    """
    try:
        # Decode the base64 image
        image_bytes = base64.b64decode(request.image_base64)
        print("Successfully decoded base64. Attempting to open image.")
        image = Image.open(BytesIO(image_bytes))

        # Perform object detection with YOLOv8
        results = model(image)
        detected_objects = []
        keywords_for_scraper = set()

        for r in results:
            for box in r.boxes:
                class_id = int(box.cls[0])
                label = model.names[class_id]
                confidence = float(box.conf[0])
                x1, y1, x2, y2 = map(int, box.xyxy[0])
                detected_objects.append(
                    {
                        "label": label,
                        "confidence": round(confidence, 2),
                        "box": [x1, y1, x2, y2],
                    }
                )
                keywords_for_scraper.add(label)

        if not detected_objects:
            return {
                "detections": [],
                "message": "No objects detected in the image",
                "appraisal_summary": [],
            }

        # Get price appraisals for detected objects from multiple sources
        appraisal_results = []
        for keyword in list(keywords_for_scraper)[:5]:  # Limit to 5 keywords
            try:
                appraisal = get_appraisal(keyword)
                if appraisal["total_listings"] > 0:
                    appraisal_results.append(
                        {
                            "keyword": keyword,
                            "total_listings": appraisal["total_listings"],
                            "average_price": appraisal["overall_average"],
                            "median_price": appraisal["overall_median"],
                            "currency": "$",
                            "price_range": appraisal["price_range"],
                            "sources": appraisal["sources"],
                        }
                    )
            except Exception as e:
                print(f"Error appraising {keyword}: {e}")
                continue

        return {
            "detections": detected_objects,
            "num_detections": len(detected_objects),
            "appraisal_summary": appraisal_results,
            "message": f"Found {len(detected_objects)} objects and {len(appraisal_results)} price estimates",
        }

    except Exception as e:
        print(f"An error occurred during detection or appraisal: {e}")
        import traceback

        traceback.print_exc()
        raise HTTPException(
            status_code=500,
            detail=f"Internal Server Error during detection or appraisal: {str(e)}",
        )


@app.get("/health")
async def health_check():
    """Health check endpoint."""
    return {"status": "healthy", "model_loaded": model is not None}


if __name__ == "__main__":
    uvicorn.run(
        app, host="0.0.0.0", port=8000, ssl_keyfile="key.pem", ssl_certfile="cert.pem"
    )

# Serve static files for PWA
import os

from fastapi.responses import FileResponse
from fastapi.staticfiles import StaticFiles

# Serve static directory
if os.path.exists("static"):
    app.mount("/static", StaticFiles(directory="static"), name="static")


# Serve root as index.html
@app.get("/")
async def serve_index():
    from fastapi.responses import HTMLResponse

    try:
        with open("index.html", "r") as f:
            return HTMLResponse(content=f.read())
    except:
        return {"message": "SenorScout API", "docs": "/docs"}


# Serve PWA manifest
@app.get("/manifest.json")
async def serve_manifest():
    try:
        with open("manifest.json", "r") as f:
            return FileResponse("manifest.json", media_type="application/json")
    except:
        return {"error": "manifest not found"}


# Serve service worker
@app.get("/sw.js")
async def serve_sw():
    try:
        return FileResponse("sw.js", media_type="application/javascript")
    except:
        return {"error": "service worker not found"}


# Serve icons
@app.get("/icon-192.png")
async def serve_icon_192():
    try:
        return FileResponse("icon-192.png", media_type="image/png")
    except:
        return {"error": "icon not found"}


@app.get("/icon-512.png")
async def serve_icon_512():
    try:
        return FileResponse("icon-512.png", media_type="image/png")
    except:
        return {"error": "icon not found"}
