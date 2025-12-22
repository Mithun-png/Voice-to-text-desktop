# Voice-to-Text Desktop App (Tauri + Deepgram)

## Overview
This project is a cross-platform desktop application that converts spoken voice input into text using a push-to-talk workflow. The application is built with Tauri and React, and integrates Deepgram for accurate and low-latency speech-to-text transcription.

The focus of this project is functionality, clean architecture, and realistic user workflows rather than advanced UI styling.

---

## Tech Stack
- **Tauri** – Lightweight framework for building desktop applications
- **React + TypeScript** – User interface and state management
- **Deepgram API** – Speech-to-text transcription
- **MediaRecorder API** – Microphone audio capture

---

## Core Features

### Push-to-Talk Voice Input
- Hold the microphone button to start recording
- Release the button to stop recording and transcribe
- Spacebar shortcut is supported (hold to record, release to stop)

### Microphone Access & Audio Capture
- Requests microphone permission from the system
- Captures high-quality audio using the MediaRecorder API
- Gracefully handles permission denial

### Near Real-Time Transcription
- Audio is sent to Deepgram immediately after recording stops
- Transcription results are returned with minimal latency
- Text is displayed instantly to the user

### Display & Insert Text
- Transcribed text is displayed clearly in the UI
- Users can copy the text to the clipboard
- Clipboard-based insertion allows pasting the text into any application

### Recording Controls & Visual Feedback
- Clear recording state indication (Idle / Recording)
- Color change and pulse animation while recording
- Intuitive microphone-based interaction

### Error Handling
- Handles microphone permission denial
- Handles network or transcription API errors
- Displays user-friendly error messages without crashing

---

## Architecture & Code Structure

The project follows a clear separation of concerns to keep the code clean and maintainable.

```
src/
 ├─ audio/
 │   └─ recorder.ts        # Microphone access and audio recording logic
 ├─ services/
 │   └─ deepgram.ts        # Deepgram API integration
 ├─ App.tsx                # UI logic and user interaction flow
 ├─ App.css                # Application styling
```

### Design Principles
- UI logic is separated from audio capture and API communication
- Each module has a single, well-defined responsibility
- Meaningful variable and function names are used throughout
- Consistent formatting and readable code structure

---

## Known Limitations
- This implementation uses near real-time transcription by sending audio after recording stops
- Live streaming transcription via WebSockets is not implemented
- UI styling is intentionally minimal

---

## Setup Instructions

### Prerequisites
- Node.js (LTS)
- Rust (installed via rustup)
- Visual Studio Build Tools (Desktop development with C++)
- A Deepgram API key

### Installation Steps
1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a `.env` file in the project root:
   ```env
   VITE_DEEPGRAM_API_KEY=your_deepgram_api_key_here
   ```
4. Run the application:
   ```bash
   npm run tauri dev
   ```

---

## Demo
A short demo video demonstrates:
- Push-to-talk voice input
- Recording state feedback
- Transcription results displayed in real time

---

## Conclusion
This project demonstrates how AI-powered speech recognition can be integrated into a cross-platform desktop application using modern tools. The implementation emphasizes clean architecture, clear separation of concerns, and practical user workflows.
