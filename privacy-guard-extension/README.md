# Privacy Guard Chrome Extension

A real-time privacy protection extension that automatically detects and blurs sensitive information during screen sharing or streaming.

## Features

- Real-time detection and blurring of sensitive information
- Zero latency (works directly on HTML DOM)
- Detects and blurs:
  - Email addresses
  - Phone numbers
  - Credit card numbers
  - Social Security Numbers (SSN)
- Hover to reveal protected information
- Lightweight and efficient

## Installation

1. Open Chrome and navigate to `chrome://extensions/`
2. Enable "Developer mode" in the top right corner
3. Click "Load unpacked" and select the extension directory
4. The extension icon should appear in your Chrome toolbar

## Usage

- The extension works automatically on all web pages
- Sensitive information is blurred by default
- Hover over blurred content to temporarily reveal it
- Click the extension icon to access settings and toggle different types of protection

## How it Works

The extension uses pattern matching and DOM manipulation to identify and blur sensitive information in real-time. It works directly on the HTML level, which means:
- No screen capture required
- Zero latency
- Minimal CPU usage
- Works with any screen sharing or streaming software

## Privacy

All detection and blurring happens locally in your browser. No data is collected or transmitted.
