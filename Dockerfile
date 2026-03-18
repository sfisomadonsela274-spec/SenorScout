SenorScout/Dockerfile
```

```dockerfile
# SenorScout - AI-Powered Price Scanner
# Dockerfile for containerized deployment

FROM python:3.11-slim

# Set working directory
WORKDIR /app

# Install system dependencies needed for OpenCV and other libraries
RUN apt-get update && apt-get install -y \
    curl \
    libgl1-mesa-glx \
    libglib2.0-0 \
    libsm6 \
    libxext6 \
    libxrender-dev \
    && rm -rf /var/lib/apt/lists/*

# Copy requirements first for better layer caching
COPY requirements.txt .

# Install Python dependencies
RUN pip install --no-cache-dir -r requirements.txt

# Copy application code
COPY . .

# Create directory for YOLO model if needed
RUN mkdir -p /app/.cache/yolo

# Download YOLO model if not present
RUN if [ ! -f yolov8n.pt ]; then \
    echo "YOLO model will be used from current directory"; \
    fi

# Expose port
EXPOSE 8000

# Environment variables
ENV PYTHONUNBUFFERED=1
ENV HOST=0.0.0.0
ENV PORT=8000

# Run the application
CMD ["uvicorn", "app:app", "--host", "0.0.0.0", "--port", "8000"]
