"use client";

import { useState } from "react";

export default function Home() {
  const [text, setText] = useState("");
  const [voice, setVoice] = useState("alloy");
  const [loading, setLoading] = useState(false);
  const [audioUrl, setAudioUrl] = useState("");

  async function generateVoice() {
    if (!text.trim()) {
      alert("Please enter your script");
      return;
    }

    setLoading(true);
    setAudioUrl("");

    try {
      const response = await fetch("/api/speech", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          text: text,
          voice: voice
        })
      });

      if (!response.ok) {
        throw new Error("Voice generation failed");
      }

      const blob = await response.blob();

      const url = URL.createObjectURL(blob);

      setAudioUrl(url);

    } catch (error) {
      alert("Voice generation failed");
    }

    setLoading(false);
  }

  return (
    <main className="page">

      <div className="card">

        <h1>Hindi AI Voice</h1>

        <p>
          Convert your Hindi & Hinglish scripts into AI voice.
        </p>

        <textarea
          placeholder="अपना Hindi script यहाँ लिखें..."
          value={text}
          onChange={(e) => setText(e.target.value)}
        />

        <label>Choose Voice</label>

        <select
          value={voice}
          onChange={(e) => setVoice(e.target.value)}
        >
          <option value="alloy">Alloy</option>
          <option value="echo">Echo</option>
          <option value="fable">Fable</option>
          <option value="onyx">Onyx</option>
          <option value="nova">Nova</option>
          <option value="shimmer">Shimmer</option>
        </select>

        <button
          onClick={generateVoice}
          disabled={loading}
        >
          {loading ? "Generating..." : "Generate Voice"}
        </button>

        {audioUrl && (
          <div className="result">

            <h3>Your Voice</h3>

            <audio controls src={audioUrl} />

            <a
              href={audioUrl}
              download="hindi-ai-voice.mp3"
            >
              Download Audio
            </a>

          </div>
        )}

      </div>

    </main>
  );
    }
