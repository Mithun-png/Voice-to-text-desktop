import { useState, useEffect } from "react";
import micIcon from "./assets/mic.png";
import { startRecording, stopRecording } from "./audio/recorder";
import { transcribe } from "./services/deepgram";
import "./App.css";

function App() {
  const [listening, setListening] = useState(false);
  const [text, setText] = useState("Your transcription will appear here...");
  const [copied, setCopied] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
  function handleKeyDown(e: KeyboardEvent) {
    if (e.code === "Space" && !listening) {
      e.preventDefault(); // stops page scrolling
      handlePress();
    }
  }

  function handleKeyUp(e: KeyboardEvent) {
    if (e.code === "Space" && listening) {
      e.preventDefault();
      handleRelease();
    }
  }

  window.addEventListener("keydown", handleKeyDown);
  window.addEventListener("keyup", handleKeyUp);

  return () => {
    window.removeEventListener("keydown", handleKeyDown);
    window.removeEventListener("keyup", handleKeyUp);
  };
}, [listening]);

  function copyToClipboard() {
  if (!text) return;
  navigator.clipboard.writeText(text);
  setCopied(true);
  setTimeout(() => setCopied(false), 1500);
}



  async function handlePress() {
    setError("");
    setListening(true);
    await startRecording();
  }

  async function handleRelease() {
  setListening(false);

  try {
    const audio = await stopRecording();
    const result = await transcribe(audio);

    if (!result) {
      setError("No speech detected. Please try again.");
      return;
    }

    setText(result);
  } catch (err: any) {
    if (err.message === "MIC_PERMISSION_DENIED") {
      setError("Microphone access denied. Please allow mic permission.");
    } else if (err.message === "TRANSCRIPTION_FAILED") {
      setError("Network or transcription error. Please try again.");
    } else {
      setError("Unexpected error occurred.");
    }
  }
}


  return (
    <div className="app-container">
      <div className="card">
        <h1 className="title">Voice to Text</h1>
        <p className="subtitle">
          Hold the button, speak naturally, release to transcribe
        </p>
        <p className={`status ${listening ? "on" : "off"}`}>
  {listening ? "● Recording" : "Idle"}
</p>

    <div className={`mic-wrapper ${listening ? "pulsing" : ""}`}>
      <button
        className={`mic-button ${listening ? "recording" : ""}`}
        onMouseDown={handlePress}
        onMouseUp={handleRelease}
        onTouchStart={handlePress}   // ← Add this
        onTouchEnd={handleRelease}
      >
       <img src={micIcon} alt="Microphone" className="mic-icon" />
      </button>
    </div>

    <p className="hint">
  {listening
    ? "Recording… Release to stop"
    : "Hold mic or press Space to start recording"}
</p>


<div className="output-box">
  {text}
</div>

<div className="actions">
  <button
    className="copy-btn"
    onClick={copyToClipboard}
    disabled={!text}
  >
    {copied ? "Copied ✓" : "Copy Text"}
  </button>
</div>

        {error && <p className="error">{error}</p>}
      </div>
    </div>
  );
}

export default App;
