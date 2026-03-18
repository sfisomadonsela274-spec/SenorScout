# SenorScout API

Free web scraping API for price comparison with ZAR conversion.

## Setup

```bash
cd api
python3 -m venv venv
source venv/bin/activate
pip install -r requirements.txt
```

## Run

```bash
python main.py
```

API will be available at `http://localhost:8000`

## Endpoints

- `POST /scrape` - Search prices by keyword
- `POST /detect_and_appraise` - Detect objects in image and appraise value
- `GET /convert` - Convert USD to ZAR (query: `?usd=100`)
- `POST /convert` - Convert USD to ZAR (JSON body)
- `GET /docs` - API documentation (Swagger UI)

## Example Usage

### Scrape prices:
```bash
curl -X POST "http://localhost:8000/scrape" \
  -H "Content-Type: application/json" \
  -d '{"keyword": "laptop"}'
```

### Convert USD to ZAR:
```bash
# GET method
curl "http://localhost:8000/convert?usd=100"

# POST method
curl -X POST "http://localhost:8000/convert" \
  -H "Content-Type: application/json" \
  -d '{"usd_amount": 250}'
```

### Response:
```json
{
  "usd_amount": 100.0,
  "zar_amount": 1687.0,
  "exchange_rate": 16.87,
  "timestamp": "2026-03-15T13:43:58"
}
```
