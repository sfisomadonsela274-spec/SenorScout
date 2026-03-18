# SenorScout - AI-Powered Price Scanner

An AR (Augmented Reality) scout system that uses machine learning to detect objects through your phone camera and provides real-time price estimates by scraping multiple online marketplaces.

![SenorScout](https://img.shields.io/badge/SenorScout-AI%20Price%20Scanner-blue)
![Python](https://img.shields.io/badge/Python-3.11+-green)
![FastAPI](https://img.shields.io/badge/FastAPI-Web%20Framework-red)

## 🎯 Features

- **📸 Real-time Object Detection** - Uses YOLOv8 to detect objects through your phone camera
- **💰 Multi-Source Price Scraping** - Fetches prices from Amazon, eBay, and Craigslist
- **📊 Comprehensive Analytics** - Provides average, median, and price ranges
- **🔍 Keyword Search** - Search for item prices without using the camera
- **📱 Mobile-Friendly UI** - Beautiful, responsive interface that works on phones and desktop
- **☁️ Cloud Ready** - Easy deployment to Heroku, Render, AWS, or Docker

## 🚀 Quick Start

### Prerequisites

- Python 3.11+
- pip or conda
- For camera access: HTTPS server (required by browsers) or localhost

### Installation

1. **Clone the repository**
```bash
cd SenorScout
```

2. **Create a virtual environment**
```bash
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
```

3. **Install dependencies**
```bash
pip install -r requirements.txt
```

4. **Download YOLO model** (if not present)
```bash
# The model yolov8n.pt should be in the project root
# It's automatically downloaded on first run by ultralytics
```

### Running Locally

1. **Start the backend server**
```bash
uvicorn app:app --reload
```

2. **Open the frontend**
- Open `index.html` in your browser
- Or serve it with a local server:
```bash
python -m http.server 8000
```

3. **Access the app**
- Backend API: http://localhost:8000
- API Documentation: http://localhost:8000/docs
- Frontend: http://localhost:8000 (if serving from FastAPI) or open index.html directly

### Using Docker

```bash
# Build and run with Docker Compose
docker-compose up --build

# Or just run the API
docker build -t senorscout .
docker run -p 8000:8000 senorscout
```

## 📡 API Endpoints

### Core Endpoints

| Endpoint | Method | Description |
|----------|--------|-------------|
| `/` | GET | API information |
| `/health` | GET | Health check |
| `/scrape` | POST | Search prices (eBay only) |
| `/appraise` | POST | Multi-source price appraisal |
| `/detect_and_appraise` | POST | Detect objects + get prices |

### Example Usage

#### Search Prices by Keyword
```bash
curl -X POST http://localhost:8000/scrape \
  -H "Content-Type: application/json" \
  -d '{"keyword": "iPhone 13"}'
```

#### Get Detailed Appraisal (Multi-Source)
```bash
curl -X POST http://localhost:8000/appraise \
  -H "Content-Type: application/json" \
  -d '{"keyword": "MacBook Pro"}'
```

#### Detect and Appraise (with image)
```bash
curl -X POST http://localhost:8000/detect_and_appraise \
  -H "Content-Type: application/json" \
  -d '{"image_base64": "<base64_encoded_image>"}'
```

## 🛠️ Project Structure

```
SenorScout/
├── app.py              # FastAPI backend
├── scraper.py          # Multi-source price scraper
├── index.html          # Frontend UI
├── requirements.txt    # Python dependencies
├── Dockerfile          # Docker configuration
├── docker-compose.yml  # Docker Compose setup
├── Procfile            # Heroku deployment
├── runtime.txt         # Python version for Heroku
├── .gitignore          # Git ignore rules
└── yolov8n.pt         # YOLO model (auto-downloaded)
```

## ☁️ Deployment

### Heroku

```bash
# Install Heroku CLI if needed
heroku login

# Create Heroku app
heroku create senorscout

# Push to Heroku
git push heroku main

# Open the app
heroku open
```

### Render

1. Connect your GitHub repository to Render
2. Set the following:
   - Build Command: `pip install -r requirements.txt`
   - Start Command: `uvicorn app:app --host 0.0.0.0 --port $PORT`

### AWS EC2

```bash
# SSH into your instance
ssh ubuntu@your-instance-ip

# Install Docker
sudo apt update
sudo apt install docker.io docker-compose

# Clone and run
git clone your-repo
cd SenorScout
docker-compose up -d
```

## 🔧 Configuration

### Environment Variables

Create a `.env` file for local development:
```env
HOST=0.0.0.0
PORT=8000
DEBUG=false
```

### Changing the YOLO Model

Edit `app.py` to use a different model:
```python
# Available models: yolov8n.pt, yolov8s.pt, yolov8m.pt, yolov8l.pt, yolov8x.pt
model = YOLO("yolov8m.pt")  # Medium model - more accurate but slower
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is for educational and personal use. When scraping websites, please respect their terms of service and robots.txt.

## 🙏 Acknowledgments

- [YOLOv8](https://github.com/ultralytics/ultralytics) - Object detection model
- [FastAPI](https://fastapi.tiangolo.com/) - Web framework
- [Beautiful Soup](https://www.crummy.com/software/BeautifulSoup/) - Web scraping

## 📞 Support

If you encounter any issues:
1. Check the API documentation at `/docs`
2. Ensure the backend is running on port 8000
3. For camera access issues, make sure you're using HTTPS or localhost

---

**Note:** This app requires an internet connection to scrape prices from online marketplaces.