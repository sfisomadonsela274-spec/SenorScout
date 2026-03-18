// Import CSS styles
import "./style.css";

let stream = null;
let capturedBase64 = null;
const API_BASE = "http://localhost:8000";

// Real-time detection variables
let detectionInterval = null;
let isDetecting = false;
let lastDetectionTime = 0;
const DETECTION_INTERVAL = 500; // Detect every 500ms for smoother experience
const AUTO_CAPTURE_CONFIDENCE = 0.85; // Auto-capture threshold
let hasAutoCaptured = false;

// Canvas for real-time detection overlay
let detectionCanvas = null;
let detectionCtx = null;

// Tab switching
function switchTab(tabName) {
    document
        .querySelectorAll(".tab")
        .forEach((t) => t.classList.remove("active"));
    document
        .querySelectorAll(".tab-content")
        .forEach((c) => c.classList.remove("active"));

    if (tabName === "camera") {
        document
            .querySelectorAll(".tab")[0]
            .classList.add("active");
        document
            .getElementById("cameraTab")
            .classList.add("active");
    } else if (tabName === "upload") {
        document
            .querySelectorAll(".tab")[1]
            .classList.add("active");
        document
            .getElementById("uploadTab")
            .classList.add("active");
    } else if (tabName === "search") {
        document
            .querySelectorAll(".tab")[2]
            .classList.add("active");
        document
            .getElementById("searchTab")
            .classList.add("active");
    }
}

// Real-time detection functions
function initDetectionCanvas() {
    detectionCanvas = document.getElementById("detectionCanvas");
    const video = document.getElementById("videoPreview");
    if (detectionCanvas && video) {
        detectionCanvas.width = video.videoWidth || 640;
        detectionCanvas.height = video.videoHeight || 480;
        detectionCtx = detectionCanvas.getContext("2d");
    }
}

async function performRealTimeDetection() {
    if (isDetecting || !stream) return;

    const now = Date.now();
    if (now - lastDetectionTime < DETECTION_INTERVAL) return;

    const video = document.getElementById("videoPreview");
    if (!video || video.readyState !== 4) return;

    isDetecting = true;
    lastDetectionTime = now;

    try {
        // Create canvas to capture frame
        const canvas = document.createElement("canvas");
        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;
        const ctx = canvas.getContext("2d");
        ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

        // Convert to base64
        const base64Image = canvas.toDataURL("image/jpeg", 0.7).split(",")[1];

        // Call detection endpoint
        const response = await fetch(`${API_BASE}/detect`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ image_base64: base64Image }),
        });

        if (response.ok) {
            const data = await response.json();
            drawDetections(data.detections, canvas.width, canvas.height);
        }
    } catch (error) {
        console.error("Real-time detection error:", error);
    } finally {
        isDetecting = false;
    }
}

function drawDetections(detections, imgWidth, imgHeight) {
    if (!detectionCtx || !detectionCanvas) return;

    // Clear canvas
    detectionCtx.clearRect(0, 0, detectionCanvas.width, detectionCanvas.height);

    if (!detections || detections.length === 0) return;

    // Calculate scale factors if canvas size differs from image size
    const scaleX = detectionCanvas.width / imgWidth;
    const scaleY = detectionCanvas.height / imgHeight;

    detections.forEach((det) => {
        const [x1, y1, x2, y2] = det.box;
        const confidence = det.confidence;
        const label = det.label;

        // Scale coordinates
        const sx1 = x1 * scaleX;
        const sy1 = y1 * scaleY;
        const sx2 = x2 * scaleX;
        const sy2 = y2 * scaleY;
        const width = sx2 - sx1;
        const height = sy2 - sy1;

        // Color based on confidence (green for high, yellow for medium, red for low)
        let color = "#ff4444";
        if (confidence > 0.8) color = "#00ff88";
        else if (confidence > 0.5) color = "#ffcc00";

        // Draw bounding box
        detectionCtx.strokeStyle = color;
        detectionCtx.lineWidth = 3;
        detectionCtx.strokeRect(sx1, sy1, width, height);

        // Draw label background
        const labelText = `${label} ${Math.round(confidence * 100)}%`;
        detectionCtx.font = "bold 14px sans-serif";
        const textMetrics = detectionCtx.measureText(labelText);
        const textWidth = textMetrics.width;
        const textHeight = 20;

        detectionCtx.fillStyle = color;
        detectionCtx.fillRect(sx1, sy1 - textHeight, textWidth + 10, textHeight);

        // Draw label text
        detectionCtx.fillStyle = "#000";
        detectionCtx.fillText(labelText, sx1 + 5, sy1 - 5);
    });
}

function clearDetections() {
    if (detectionCtx && detectionCanvas) {
        detectionCtx.clearRect(0, 0, detectionCanvas.width, detectionCanvas.height);
    }
}

function startDetectionLoop() {
    if (detectionInterval) clearInterval(detectionInterval);
    detectionInterval = setInterval(performRealTimeDetection, DETECTION_INTERVAL);
}

function stopDetectionLoop() {
    if (detectionInterval) {
        clearInterval(detectionInterval);
        detectionInterval = null;
    }
    clearDetections();
}

// Camera functions
async function startCamera() {
    const video = document.getElementById("videoPreview");
    const placeholder =
        document.getElementById("cameraPlaceholder");
    const startBtn = document.getElementById("startCameraBtn");
    const captureBtn = document.getElementById("captureBtn");
    const stopBtn = document.getElementById("stopCameraBtn");
    const statusDot = document.getElementById("cameraStatus");
    const statusText = document.getElementById("cameraStatusText");

    try {
        // Prefer back camera on mobile devices
        const constraints = {
            video: {
                facingMode: { ideal: "environment" },
                width: { ideal: 1280 },
                height: { ideal: 720 },
            },
        };

        stream =
            await navigator.mediaDevices.getUserMedia(constraints);
        video.srcObject = stream;
        video.style.display = "block";
        placeholder.style.display = "none";
        startBtn.style.display = "none";
        captureBtn.disabled = false;
        captureBtn.style.display = "block";
        stopBtn.style.display = "block";

        statusDot.classList.add("active");
        statusText.textContent = "Camera active - Real-time detection on";

        // Initialize canvas and start detection loop once video is ready
        video.onloadedmetadata = () => {
            initDetectionCanvas();
            startDetectionLoop();
        };
    } catch (err) {
        console.error("Camera error:", err);
        alert(
            "Could not access camera: " +
                err.message +
                "\n\nPlease ensure camera permissions are granted.",
        );
    }
}

function stopCamera() {
    const video = document.getElementById("videoPreview");
    const startBtn = document.getElementById("startCameraBtn");
    const captureBtn = document.getElementById("captureBtn");
    const stopBtn = document.getElementById("stopCameraBtn");
    const statusDot = document.getElementById("cameraStatus");
    const statusText = document.getElementById("cameraStatusText");

    // Stop detection loop first
    stopDetectionLoop();

    if (stream) {
        stream.getTracks().forEach((track) => track.stop());
        stream = null;
    }

    video.style.display = "none";
    video.srcObject = null;
    startBtn.style.display = "block";
    captureBtn.disabled = true;
    captureBtn.style.display = "none";
    stopBtn.style.display = "none";

    statusDot.classList.remove("active");
    statusText.textContent = "Camera stopped";
}

function captureImage() {
    const video = document.getElementById("videoPreview");
    const capturedImg = document.getElementById("capturedImage");

    // Create canvas to capture frame
    const canvas = document.createElement("canvas");
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;

    const ctx = canvas.getContext("2d");
    ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

    // Convert to base64
    capturedBase64 = canvas
        .toDataURL("image/jpeg", 0.8)
        .split(",")[1];

    // Show captured image
    capturedImg.src = canvas.toDataURL("image/jpeg", 0.8);
    capturedImg.style.display = "block";
    video.style.display = "none";

    // Automatically analyze
    analyzeImage(capturedBase64);
}

// File upload functions
function handleFileSelect(event) {
    const file = event.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function (e) {
            document.getElementById("uploadedPreview").src =
                e.target.result;
            document.getElementById("uploadedPreviewContainer").classList.add("active");
            capturedBase64 = e.target.result.split(",")[1];
        };
        reader.readAsDataURL(file);
    }
}

function clearUpload() {
    document.getElementById("uploadedPreview").src = "";
    document.getElementById("uploadedPreviewContainer").classList.remove("active");
    document.getElementById("imageInput").value = "";
    capturedBase64 = null;
}

function uploadSelectedImage() {
    if (!capturedBase64) {
        alert("Please select an image first");
        return;
    }
    analyzeImage(capturedBase64);
}

// Search function
async function searchByKeyword() {
    const keyword = document
        .getElementById("keywordInput")
        .value.trim();
    if (!keyword) {
        alert("Please enter a keyword");
        return;
    }

    showLoading("Searching for prices...");

    try {
        const response = await fetch(`${API_BASE}/scrape`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ keyword: keyword }),
        });

        if (!response.ok) {
            throw new Error(
                `HTTP error! status: ${response.status}`,
            );
        }

        const data = await response.json();
        displaySearchResults(data);
    } catch (error) {
        console.error("Error:", error);
        showError("Search failed: " + error.message);
    }
}

function displaySearchResults(data) {
    const resultsSection =
        document.getElementById("resultsSection");
    const detectionResults =
        document.getElementById("detectionResults");
    const appraisalResults =
        document.getElementById("appraisalResults");

    resultsSection.style.display = "block";
    detectionResults.innerHTML =
        '<div class="detection-card"><div class="detection-label">Manual Search</div><div class="detection-meta">No object detection available for keyword search</div></div>';

    if (data.average_price) {
        appraisalResults.innerHTML = `
        <div class="appraisal-card">
            <div class="appraisal-keyword">${data.keyword}</div>
            <div class="appraisal-price">${data.currency}${data.average_price}</div>
            <div class="appraisal-meta">${data.num_listings} sold listings found</div>
        </div>
    `;
    } else {
        appraisalResults.innerHTML =
            '<p style="color: #888;">No price data found</p>';
    }
}

// Main analysis function
async function analyzeImage(base64Image) {
    showLoading("Analyzing image and fetching prices...");

    try {
        const response = await fetch(
            `${API_BASE}/detect_and_appraise`,
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ image_base64: base64Image }),
            },
        );

        if (!response.ok) {
            throw new Error(
                `HTTP error! status: ${response.status}`,
            );
        }

        const data = await response.json();
        displayResults(data);
    } catch (error) {
        console.error("Error:", error);
        showError(
            "Analysis failed: " +
                error.message +
                "\n\nMake sure the backend server is running on localhost:8000",
        );
    }
}

function displayResults(data) {
    const resultsSection =
        document.getElementById("resultsSection");
    const detectionResults =
        document.getElementById("detectionResults");
    const appraisalResults =
        document.getElementById("appraisalResults");

    resultsSection.style.display = "block";

    // Display detections
    if (data.detections && data.detections.length > 0) {
        detectionResults.innerHTML = data.detections
            .map(
                (d) => `
        <div class="detection-card">
            <div class="detection-label">${d.label}</div>
            <div class="detection-meta">
                <span class="confidence-badge">${Math.round(d.confidence * 100)}% confidence</span>
            </div>
        </div>
    `,
            )
            .join("");
    } else {
        detectionResults.innerHTML =
            '<div class="detection-card"><div class="detection-label">No objects detected</div><div class="detection-meta">Try capturing a clearer image</div></div>';
    }

    // Display appraisal
    if (
        data.appraisal_summary &&
        data.appraisal_summary.length > 0
    ) {
        appraisalResults.innerHTML = data.appraisal_summary
            .map(
                (a) => `
        <div class="appraisal-card">
            <div class="appraisal-keyword">${a.keyword}</div>
            <div class="appraisal-price">${a.currency}${a.average_price}</div>
            <div class="appraisal-meta">${a.total_listings} sold listings analyzed</div>
        </div>
    `,
            )
            .join("");
    } else {
        appraisalResults.innerHTML =
            '<div class="appraisal-card"><div class="appraisal-keyword">No price data</div><div class="appraisal-meta">No market data found for detected objects</div></div>';
    }
}

function showLoading(message) {
    const resultsSection =
        document.getElementById("resultsSection");
    resultsSection.style.display = "block";
    document.getElementById("detectionResults").innerHTML =
        `<div class="loading-state"><div class="spinner"></div><p>${message}</p></div>`;
    document.getElementById("appraisalResults").innerHTML = "";
}

function showError(message) {
    const resultsSection =
        document.getElementById("resultsSection");
    resultsSection.style.display = "block";
    document.getElementById("detectionResults").innerHTML =
        `<div class="error-state">${message}</div>`;
    document.getElementById("appraisalResults").innerHTML = "";
}

// Check if backend is available on load
window.addEventListener("load", async () => {
    try {
        const response = await fetch(`${API_BASE}/docs`, {
            method: "HEAD",
        });
        console.log(
            "Backend check - status:",
            response.status,
            "ok:",
            response.ok,
        );
        if (response.ok) {
            document.getElementById(
                "cameraStatusText",
            ).textContent = "Backend connected";
            document
                .getElementById("cameraStatus")
                .classList.add("active");
        } else {
            document.getElementById(
                "cameraStatusText",
            ).textContent = "Backend error: " + response.status;
        }
    } catch (err) {
        console.log("Backend connection error:", err);
        document.getElementById("cameraStatusText").textContent =
            "Backend not connected: " + err.message;
    }
});

// Expose functions to window for HTML onclick handlers
window.switchTab = switchTab;
window.startCamera = startCamera;
window.stopCamera = stopCamera;
window.captureImage = captureImage;
window.handleFileSelect = handleFileSelect;
window.clearUpload = clearUpload;
window.uploadSelectedImage = uploadSelectedImage;
window.searchByKeyword = searchByKeyword;
