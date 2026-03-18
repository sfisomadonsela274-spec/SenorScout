// Import CSS styles
import "./style.css";

// Mock data for price search (static price comparison)
const mockProducts = [
  // Electronics
  {
    name: "iPhone 13 Pro",
    category: "electronics",
    price: 799,
    condition: "new",
    source: "Amazon",
  },
  {
    name: "iPhone 13 Pro",
    category: "electronics",
    price: 650,
    condition: "like-new",
    source: "eBay",
  },
  {
    name: "iPhone 13 Pro",
    category: "electronics",
    price: 550,
    condition: "good",
    source: "eBay",
  },
  {
    name: "iPhone 13",
    category: "electronics",
    price: 699,
    condition: "new",
    source: "Amazon",
  },
  {
    name: "iPhone 13",
    category: "electronics",
    price: 480,
    condition: "good",
    source: "eBay",
  },
  {
    name: "iPhone 12",
    category: "electronics",
    price: 599,
    condition: "new",
    source: "Amazon",
  },
  {
    name: "iPhone 12",
    category: "electronics",
    price: 350,
    condition: "good",
    source: "eBay",
  },
  {
    name: "MacBook Pro 14",
    category: "electronics",
    price: 1999,
    condition: "new",
    source: "Amazon",
  },
  {
    name: "MacBook Pro 14",
    category: "electronics",
    price: 1650,
    condition: "like-new",
    source: "eBay",
  },
  {
    name: "MacBook Air M2",
    category: "electronics",
    price: 1199,
    condition: "new",
    source: "Amazon",
  },
  {
    name: "MacBook Air M1",
    category: "electronics",
    price: 899,
    condition: "new",
    source: "Amazon",
  },
  {
    name: "MacBook Air M1",
    category: "electronics",
    price: 650,
    condition: "good",
    source: "eBay",
  },
  {
    name: "Samsung Galaxy S23",
    category: "electronics",
    price: 799,
    condition: "new",
    source: "Amazon",
  },
  {
    name: "Samsung Galaxy S22",
    category: "electronics",
    price: 599,
    condition: "new",
    source: "Amazon",
  },
  {
    name: "Sony WH-1000XM5",
    category: "electronics",
    price: 399,
    condition: "new",
    source: "Amazon",
  },
  {
    name: "Sony WH-1000XM5",
    category: "electronics",
    price: 280,
    condition: "good",
    source: "eBay",
  },
  {
    name: "AirPods Pro",
    category: "electronics",
    price: 249,
    condition: "new",
    source: "Amazon",
  },
  {
    name: "AirPods Pro",
    category: "electronics",
    price: 180,
    condition: "good",
    source: "eBay",
  },
  {
    name: "iPad Pro 12.9",
    category: "electronics",
    price: 1099,
    condition: "new",
    source: "Amazon",
  },
  {
    name: "iPad Air",
    category: "electronics",
    price: 599,
    condition: "new",
    source: "Amazon",
  },

  // Clothing
  {
    name: "Nike Air Jordan 1",
    category: "clothing",
    price: 180,
    condition: "new",
    source: "Nike",
  },
  {
    name: "Nike Air Jordan 1",
    category: "clothing",
    price: 120,
    condition: "good",
    source: "eBay",
  },
  {
    name: "Nike Dunk Low",
    category: "clothing",
    price: 110,
    condition: "new",
    source: "Nike",
  },
  {
    name: "Adidas Yeezy 350",
    category: "clothing",
    price: 230,
    condition: "new",
    source: "Adidas",
  },
  {
    name: "Adidas Yeezy 350",
    category: "clothing",
    price: 150,
    condition: "good",
    source: "eBay",
  },
  {
    name: "Levi's 501 Jeans",
    category: "clothing",
    price: 69,
    condition: "new",
    source: "Levi's",
  },
  {
    name: "North Face Jacket",
    category: "clothing",
    price: 299,
    condition: "new",
    source: "North Face",
  },
  {
    name: "North Face Jacket",
    category: "clothing",
    price: 180,
    condition: "good",
    source: "eBay",
  },
  {
    name: "Patagonia Fleece",
    category: "clothing",
    price: 139,
    condition: "new",
    source: "Patagonia",
  },
  {
    name: "Supreme Hoodie",
    category: "clothing",
    price: 168,
    condition: "new",
    source: "Supreme",
  },

  // Furniture
  {
    name: "IKEA Kallax Shelf",
    category: "furniture",
    price: 79,
    condition: "new",
    source: "IKEA",
  },
  {
    name: "IKEA MALM Desk",
    category: "furniture",
    price: 149,
    condition: "new",
    source: "IKEA",
  },
  {
    name: "Herman Miller Chair",
    category: "furniture",
    price: 1295,
    condition: "new",
    source: "Herman Miller",
  },
  {
    name: "Herman Miller Chair",
    category: "furniture",
    price: 800,
    condition: "good",
    source: "eBay",
  },
  {
    name: "West Elm Sofa",
    category: "furniture",
    price: 899,
    condition: "new",
    source: "West Elm",
  },
  {
    name: "Wayfair Coffee Table",
    category: "furniture",
    price: 199,
    condition: "new",
    source: "Wayfair",
  },
  {
    name: "Amazon Basics Bookshelf",
    category: "furniture",
    price: 89,
    condition: "new",
    source: "Amazon",
  },
  {
    name: "Eames Lounge Chair",
    category: "furniture",
    price: 699,
    condition: "good",
    source: "eBay",
  },

  // Sports
  {
    name: "Nike Air Max 90",
    category: "sports",
    price: 130,
    condition: "new",
    source: "Nike",
  },
  {
    name: "Adidas Ultraboost",
    category: "sports",
    price: 190,
    condition: "new",
    source: "Adidas",
  },
  {
    name: "Under Armour Shorts",
    category: "sports",
    price: 35,
    condition: "new",
    source: "Under Armour",
  },
  {
    name: "Peloton Bike",
    category: "sports",
    price: 1445,
    condition: "new",
    source: "Peloton",
  },
  {
    name: "Peloton Bike",
    category: "sports",
    price: 950,
    condition: "good",
    source: "eBay",
  },
  {
    name: "Yoga Mat",
    category: "sports",
    price: 40,
    condition: "new",
    source: "Amazon",
  },
  {
    name: "Dumbbells Set",
    category: "sports",
    price: 150,
    condition: "new",
    source: "Amazon",
  },
  {
    name: "Tennis Racket",
    category: "sports",
    price: 199,
    condition: "new",
    source: "Amazon",
  },

  // Vehicles
  {
    name: "Toyota Camry 2020",
    category: "vehicles",
    price: 18000,
    condition: "good",
    source: "Craigslist",
  },
  {
    name: "Honda Civic 2021",
    category: "vehicles",
    price: 22000,
    condition: "good",
    source: "Craigslist",
  },
  {
    name: "Ford F-150 2019",
    category: "vehicles",
    price: 28000,
    condition: "good",
    source: "Craigslist",
  },
  {
    name: "Tesla Model 3",
    category: "vehicles",
    price: 35000,
    condition: "new",
    source: "Tesla",
  },
  {
    name: "BMW 3 Series",
    category: "vehicles",
    price: 32000,
    condition: "good",
    source: "Craigslist",
  },

  // Books
  {
    name: "The Great Gatsby",
    category: "books",
    price: 15,
    condition: "new",
    source: "Amazon",
  },
  {
    name: "1984 by Orwell",
    category: "books",
    price: 12,
    condition: "new",
    source: "Amazon",
  },
  {
    name: "Harry Potter Box Set",
    category: "books",
    price: 79,
    condition: "new",
    source: "Amazon",
  },
  {
    name: "Steve Jobs Biography",
    category: "books",
    price: 19,
    condition: "new",
    source: "Amazon",
  },
  {
    name: "Atomic Habits",
    category: "books",
    price: 24,
    condition: "new",
    source: "Amazon",
  },
  {
    name: "Clean Code",
    category: "books",
    price: 44,
    condition: "new",
    source: "Amazon",
  },
];

// Category base prices for valuation (approximate values)
const categoryBasePrices = {
  electronics: 500,
  clothing: 100,
  furniture: 300,
  sports: 150,
  vehicles: 15000,
  books: 25,
  toys: 50,
  jewelry: 200,
  other: 75,
};

// Condition multipliers
const conditionMultipliers = {
  new: 1.0,
  "like-new": 0.85,
  excellent: 0.75,
  good: 0.6,
  fair: 0.45,
  poor: 0.25,
};

// Age multipliers
const ageMultipliers = {
  "0-3": 1.0,
  "3-6": 0.9,
  "6-12": 0.75,
  "1-2": 0.6,
  "2-5": 0.4,
  "5+": 0.25,
};

// DOM Elements
const tabs = document.querySelectorAll(".tab");
const tabContents = document.querySelectorAll(".tab-content");
const searchInput = document.getElementById("search-input");
const searchBtn = document.getElementById("search-btn");
const searchResults = document.getElementById("search-results");
const noResults = document.getElementById("no-results");
const valuatorForm = document.getElementById("valuator-form");
const valuationResult = document.getElementById("valuation-result");

// Initialize app
document.addEventListener("DOMContentLoaded", () => {
  setupTabs();
  setupSearch();
  setupValuator();
  setupAIVision();
});

// Tab switching
function setupTabs() {
  tabs.forEach((tab) => {
    tab.addEventListener("click", () => {
      const tabId = tab.dataset.tab;

      // Update tab buttons
      tabs.forEach((t) => t.classList.remove("active"));
      tab.classList.add("active");

      // Update tab content
      tabContents.forEach((content) => {
        content.classList.remove("active");
        if (content.id === tabId) {
          content.classList.add("active");
        }
      });
    });
  });
}

// Search functionality
function setupSearch() {
  searchBtn.addEventListener("click", performSearch);
  searchInput.addEventListener("keypress", (e) => {
    if (e.key === "Enter") {
      performSearch();
    }
  });
}

function performSearch() {
  const query = searchInput.value.toLowerCase().trim();

  if (!query) {
    searchInput.focus();
    return;
  }

  // Filter products by name
  const results = mockProducts.filter(
    (product) =>
      product.name.toLowerCase().includes(query) ||
      product.category.toLowerCase().includes(query),
  );

  if (results.length === 0) {
    showNoResults();
    return;
  }

  displayResults(query, results);
}

function displayResults(query, results) {
  // Update search term
  document.getElementById("search-term").textContent = query;

  // Calculate statistics
  const prices = results.map((r) => r.price);
  const avgPrice = Math.round(
    prices.reduce((a, b) => a + b, 0) / prices.length,
  );
  const medianPrice = getMedian(prices);
  const minPrice = Math.min(...prices);
  const maxPrice = Math.max(...prices);

  // Update stat cards
  document.getElementById("avg-price").textContent = formatCurrency(avgPrice);
  document.getElementById("median-price").textContent =
    formatCurrency(medianPrice);
  document.getElementById("min-price").textContent = formatCurrency(minPrice);
  document.getElementById("max-price").textContent = formatCurrency(maxPrice);
  document.getElementById("total-listings").textContent = results.length;
  document.getElementById("price-range").textContent =
    `${formatCurrency(minPrice)} - ${formatCurrency(maxPrice)}`;

  // Display sample listings (limit to 6)
  const listingsGrid = document.getElementById("listings-grid");
  listingsGrid.innerHTML = "";

  const sampleResults = results.slice(0, 6);
  sampleResults.forEach((product) => {
    const listingCard = createListingCard(product);
    listingsGrid.appendChild(listingCard);
  });

  // Show results, hide no-results
  searchResults.classList.remove("hidden");
  noResults.classList.add("hidden");
}

function createListingCard(product) {
  const card = document.createElement("div");
  card.className = "listing-card";
  card.innerHTML = `
    <div class="listing-name">${product.name}</div>
    <div class="listing-price">${formatCurrency(product.price)}</div>
    <div class="listing-details">
      <span class="listing-condition">${product.condition}</span>
      <span class="listing-source">${product.source}</span>
    </div>
  `;
  return card;
}

function showNoResults() {
  searchResults.classList.add("hidden");
  noResults.classList.remove("hidden");
}

function getMedian(arr) {
  const sorted = [...arr].sort((a, b) => a - b);
  const mid = Math.floor(sorted.length / 2);
  return sorted.length % 2 !== 0
    ? sorted[mid]
    : Math.round((sorted[mid - 1] + sorted[mid]) / 2);
}

function formatCurrency(amount) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
}

// Valuator functionality
function setupValuator() {
  valuatorForm.addEventListener("submit", (e) => {
    e.preventDefault();
    calculateValuation();
  });
}

function calculateValuation() {
  const category = document.getElementById("item-category").value;
  const brand = document.getElementById("item-brand").value;
  const condition = document.getElementById("item-condition").value;
  const age = document.getElementById("item-age").value;

  if (!category || !condition || !age) {
    alert("Please fill in all required fields");
    return;
  }

  // Get base price from category
  const basePrice = categoryBasePrices[category] || categoryBasePrices.other;

  // Apply condition multiplier
  const conditionMultiplier = conditionMultipliers[condition] || 0.5;
  const conditionAdjustment = basePrice * (conditionMultiplier - 1);

  // Apply age multiplier
  const ageMultiplier = ageMultipliers[age] || 0.5;
  const ageAdjustment = basePrice * (ageMultiplier - 1) * 0.5;

  // Calculate final value
  let estimatedValue = basePrice * conditionMultiplier * ageMultiplier;

  // Apply brand boost if applicable
  if (brand) {
    const brandUpper = brand.toUpperCase();
    const premiumBrands = [
      "APPLE",
      "NIKE",
      "SONY",
      "SAMSUNG",
      "ADIDAS",
      "HERMAN MILLER",
    ];
    if (premiumBrands.some((b) => brandUpper.includes(b))) {
      estimatedValue *= 1.2; // 20% boost for premium brands
    }
  }

  // Calculate range (±20%)
  const minValue = Math.round(estimatedValue * 0.8);
  const maxValue = Math.round(estimatedValue * 1.2);

  // Display results
  document.getElementById("estimated-value").textContent = formatCurrency(
    Math.round(estimatedValue),
  );
  document.getElementById("value-range").textContent =
    `${formatCurrency(minValue)} - ${formatCurrency(maxValue)}`;

  // Display details
  const categoryText =
    document.getElementById("item-category").options[
      document.getElementById("item-category").selectedIndex
    ].text;
  const conditionText =
    document.getElementById("item-condition").options[
      document.getElementById("item-condition").selectedIndex
    ].text;
  const ageText =
    document.getElementById("item-age").options[
      document.getElementById("item-age").selectedIndex
    ].text;

  document.getElementById("detail-category").textContent = categoryText;
  document.getElementById("detail-condition").textContent = conditionText;
  document.getElementById("detail-age").textContent = ageText;
  document.getElementById("detail-brand").textContent =
    brand || "Not specified";

  // Show result
  valuationResult.classList.remove("hidden");
}

// ==================== AI VISION FUNCTIONALITY ====================

// AI Vision DOM Elements
const uploadArea = document.getElementById("upload-area");
const imageInput = document.getElementById("image-input");
const imagePreview = document.getElementById("image-preview");
const previewImg = document.getElementById("preview-img");
const removeImageBtn = document.getElementById("remove-image");
const analyzeBtn = document.getElementById("analyze-btn");
const aiLoading = document.getElementById("ai-loading");
const aiResults = document.getElementById("ai-results");
const detectedGrid = document.getElementById("detected-grid");

let selectedImageBase64 = null;
let cameraStream = null;

// Camera DOM Elements
const uploadModeBtn = document.getElementById("upload-mode-btn");
const cameraModeBtn = document.getElementById("camera-mode-btn");
const cameraContainer = document.getElementById("camera-container");
const cameraVideo = document.getElementById("camera-video");
const startCameraBtn = document.getElementById("start-camera-btn");
const captureBtn = document.getElementById("capture-btn");
const stopCameraBtn = document.getElementById("stop-camera-btn");

// Initialize AI Vision
function setupAIVision() {
  if (!uploadArea) return;

  // Setup mode toggle
  setupCameraModeToggle();

  // Click to upload
  uploadArea.addEventListener("click", () => {
    imageInput.click();
  });

  // File input change
  imageInput.addEventListener("change", handleImageSelect);

  // Drag and drop
  uploadArea.addEventListener("dragover", (e) => {
    e.preventDefault();
    uploadArea.style.borderColor = "var(--primary)";
  });

  uploadArea.addEventListener("dragleave", (e) => {
    e.preventDefault();
    uploadArea.style.borderColor = "var(--border)";
  });

  uploadArea.addEventListener("drop", (e) => {
    e.preventDefault();
    uploadArea.style.borderColor = "var(--border)";
    const files = e.dataTransfer.files;
    if (files.length > 0) {
      handleImageFile(files[0]);
    }
  });

  // Remove image
  removeImageBtn.addEventListener("click", (e) => {
    e.stopPropagation();
    clearImage();
  });

  // Analyze button
  analyzeBtn.addEventListener("click", analyzeImage);
}

// Camera Mode Toggle
function setupCameraModeToggle() {
  if (!uploadModeBtn || !cameraModeBtn) return;

  uploadModeBtn.addEventListener("click", () => {
    switchToUploadMode();
  });

  cameraModeBtn.addEventListener("click", () => {
    switchToCameraMode();
  });

  // Setup camera buttons
  startCameraBtn.addEventListener("click", startCamera);
  captureBtn.addEventListener("click", captureAndAnalyze);
  stopCameraBtn.addEventListener("click", stopCamera);
}

function switchToUploadMode() {
  uploadModeBtn.classList.add("active");
  cameraModeBtn.classList.remove("active");
  uploadArea.style.display = "block";
  cameraContainer.style.display = "none";

  // Show analyze button in upload mode
  analyzeBtn.style.display = "block";
  if (!selectedImageBase64) {
    analyzeBtn.disabled = true;
  }

  // Stop camera if running
  if (cameraStream) {
    stopCamera();
  }
}

function switchToCameraMode() {
  uploadModeBtn.classList.remove("active");
  cameraModeBtn.classList.add("active");
  uploadArea.style.display = "none";
  cameraContainer.style.display = "block";
  imagePreview.style.display = "none";
  uploadArea.style.display = "none";

  // Reset analyze button for camera mode
  analyzeBtn.style.display = "none";
}

async function startCamera() {
  try {
    // Request camera access
    cameraStream = await navigator.mediaDevices.getUserMedia({
      video: {
        facingMode: "environment",
        width: { ideal: 1280 },
        height: { ideal: 720 },
      },
    });

    // Set video source
    cameraVideo.srcObject = cameraStream;

    // Update button states
    startCameraBtn.style.display = "none";
    captureBtn.disabled = false;
    stopCameraBtn.style.display = "block";
  } catch (error) {
    console.error("Error accessing camera:", error);
    alert(
      "Unable to access camera. Please ensure camera permissions are granted.",
    );
  }
}

function stopCamera() {
  if (cameraStream) {
    cameraStream.getTracks().forEach((track) => track.stop());
    cameraStream = null;
  }

  cameraVideo.srcObject = null;

  // Update button states
  startCameraBtn.style.display = "block";
  captureBtn.disabled = true;
  stopCameraBtn.style.display = "none";
}

async function captureAndAnalyze() {
  if (!cameraStream) {
    alert("Camera is not running");
    return;
  }

  // Create canvas to capture frame
  const canvas = document.createElement("canvas");
  canvas.width = cameraVideo.videoWidth;
  canvas.height = cameraVideo.videoHeight;

  const ctx = canvas.getContext("2d");
  ctx.drawImage(cameraVideo, 0, 0);

  // Get base64 image data
  const dataURL = canvas.toDataURL("image/jpeg", 0.9);
  selectedImageBase64 = dataURL.split(",")[1];

  // Show captured frame in preview
  previewImg.src = dataURL;
  imagePreview.style.display = "inline-block";

  // Analyze the captured image
  await analyzeImage();
}

function handleImageSelect(e) {
  const file = e.target.files[0];
  if (file) {
    handleImageFile(file);
  }
}

function handleImageFile(file) {
  if (!file.type.startsWith("image/")) {
    alert("Please select an image file");
    return;
  }

  const reader = new FileReader();
  reader.onload = (e) => {
    selectedImageBase64 = e.target.result.split(",")[1]; // Remove data URL prefix
    previewImg.src = e.target.result;
    uploadArea.style.display = "none";
    imagePreview.style.display = "inline-block";
    analyzeBtn.disabled = false;
    analyzeBtn.style.display = "block";
  };
  reader.readAsDataURL(file);
}

function clearImage() {
  selectedImageBase64 = null;
  imageInput.value = "";
  previewImg.src = "";
  uploadArea.style.display = "block";
  imagePreview.style.display = "none";
  analyzeBtn.disabled = true;
  aiResults.style.display = "none";
}

async function analyzeImage() {
  if (!selectedImageBase64) {
    alert("Please select an image first");
    return;
  }

  // Show loading
  aiLoading.style.display = "block";
  aiResults.style.display = "none";
  analyzeBtn.disabled = true;

  try {
    const response = await fetch("http://localhost:8000/detect_and_appraise", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        image_base64: selectedImageBase64,
      }),
    });

    if (!response.ok) {
      throw new Error("API request failed");
    }

    const data = await response.json();
    displayAIResults(data);
  } catch (error) {
    console.error("Error analyzing image:", error);
    alert(
      "Failed to analyze image. Make sure the API is running on port 8000.",
    );
  } finally {
    aiLoading.style.display = "none";
    analyzeBtn.disabled = false;
  }
}

function displayAIResults(data) {
  detectedGrid.innerHTML = "";

  if (!data.detections || data.detections.length === 0) {
    detectedGrid.innerHTML = "<p>No objects detected in the image.</p>";
    aiResults.style.display = "block";
    return;
  }

  data.detections.forEach((detection, index) => {
    const appraisal = data.appraisal_summary[index];
    const card = document.createElement("div");
    card.className = "detected-card";

    const confidencePercent = Math.round(detection.confidence * 100);
    const price = appraisal ? formatCurrency(appraisal.average_price) : "N/A";

    card.innerHTML = `
      <div class="detected-label">${detection.label}</div>
      <div class="detected-confidence">
        Confidence: ${confidencePercent}%
      </div>
      <div class="confidence-bar">
        <div class="confidence-fill" style="width: ${confidencePercent}%"></div>
      </div>
      <div class="detected-price">${price}</div>
      <div class="detected-price-label">Estimated Value</div>
    `;

    detectedGrid.appendChild(card);
  });

  aiResults.style.display = "block";
}
