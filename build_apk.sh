#!/bin/bash

# SenorScout APK Build Script
# This script converts the PWA into an Android APK using Capacitor

set -e

echo "========================================="
echo "  SenorScout APK Build Script"
echo "========================================="

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Check if we're in the right directory
if [ ! -f "index.html" ]; then
    echo -e "${RED}Error: index.html not found. Please run this from the SenorScout directory.${NC}"
    exit 1
fi

# Check for Node.js
if ! command -v node &> /dev/null; then
    echo -e "${RED}Error: Node.js is not installed. Please install Node.js first.${NC}"
    exit 1
fi

echo -e "${GREEN}[1/7] Checking dependencies...${NC}"

# Install npm dependencies if not present
if [ ! -d "node_modules" ]; then
    echo "Installing npm dependencies..."
    npm init -y
fi

# Install Capacitor
echo -e "${GREEN}[2/7] Installing Capacitor...${NC}"
npm install @capacitor/core @capacitor/cli @capacitor/android --save-dev

# Initialize Capacitor if not already done
if [ ! -f "capacitor.config.json" ]; then
    echo "Initializing Capacitor..."
    npx cap init "SenorScout" "com.senorscout.app" --web-dir=.
fi

# Add Android platform
echo -e "${GREEN}[3/7] Adding Android platform...${NC}"
npx cap add android

# Update the Android manifest for camera permissions
echo -e "${GREEN}[4/7] Configuring Android permissions...${NC}"

# Create android/app/src/main/AndroidManifest.xml with camera permissions
ANDROID_MANIFEST="android/app/src/main/AndroidManifest.xml"
if [ -f "$ANDROID_MANIFEST" ]; then
    # Add camera and internet permissions if not present
    if ! grep -q "android.permission.CAMERA" "$ANDROID_MANIFEST"; then
        sed -i 's/<application/<uses-permission android:name="android.permission.CAMERA" \/>\n    <uses-permission android:name="android.permission.INTERNET" \/>\n    <application/g' "$ANDROID_MANIFEST"
    fi
fi

# Build the web assets
echo -e "${GREEN}[5/7] Building web assets...${NC}"

# Copy all necessary files to android assets
mkdir -p android/app/src/main/assets/public

# Copy HTML, JS, CSS, and other static files
cp -r index.html android/app/src/main/assets/public/
cp -r manifest.json android/app/src/main/assets/public/
cp -r sw.js android/app/src/main/assets/public/
cp -r icon-*.png android/app/src/main/assets/public/

# Also copy any other static files if they exist
if [ -d "static" ]; then
    cp -r static/* android/app/src/main/assets/public/
fi

# Sync with Capacitor
echo -e "${GREEN}[6/7] Syncing with Capacitor...${NC}"
npx cap sync android

# Build the debug APK
echo -e "${GREEN}[7/7] Building debug APK...${NC}"
cd android
./gradlew assembleDebug
cd ..

# Check if APK was created
APK_PATH="android/app/build/outputs/apk/debug/app-debug.apk"
if [ -f "$APK_PATH" ]; then
    echo ""
    echo -e "${GREEN}========================================="
    echo -e "  ✅ BUILD SUCCESSFUL!"
    echo -e "=========================================${NC}"
    echo ""
    echo -e "APK Location: ${YELLOW}$APK_PATH${NC}"
    echo ""
    echo "To install on your device:"
    echo "  1. Connect your phone via USB"
    echo "  2. Run: adb install $APK_PATH"
    echo ""
    echo "Or transfer the APK to your phone and install manually."
else
    echo -e "${RED}Error: APK build failed. Check the errors above.${NC}"
    exit 1
fi
