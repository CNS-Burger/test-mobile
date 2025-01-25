"use client";

import { useRef, useState } from "react";
import ReactPlayer from "react-player";

export default function VideoPage() {
  const playerRef = useRef<ReactPlayer>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [src, setSrc] = useState(
    "https://aists-qa.hanwhalife.com/blob/hliazrqaitmdct/introduction/voice/20250124/51365639-82d9-4285-bbb7-0c2a1db07e1d.webm?sv=2024-08-04&spr=https%2Chttp&se=2025-01-25T02%3A01%3A09Z&skoid=3fd89acc-1b59-465f-958a-f2ce75594f1d&sktid=38db9aa0-6bc6-4d2a-8dc3-9c9fa38a5fc4&skt=2025-01-25T01%3A54%3A47Z&ske=2025-01-25T02%3A54%3A47Z&sks=b&skv=2024-08-04&sr=b&sp=r&sig=w10%2F1cig3nJoi0zDCR37eeZtxwzv5zccLud5b8aMjF4%3D"
  );

  const width = 640;
  const height = 360;
  const volume = 50;
  const speed = 1;
  const isLoopEnabled = false;
  const progressInterval = 1000;

  const handlePlay = () => {
    setIsPlaying(true);
  };

  const handlePause = () => {
    setIsPlaying(false);
  };

  const handleFinishPlaying = () => {
    setIsPlaying(false);
  };

  return (
    <div>
      <div>
        <input
          type="text"
          value={src}
          onChange={(e) => setSrc(e.target.value)}
        />
        <button onClick={handlePlay}>Play</button>
        <button onClick={handlePause}>Pause</button>
        <ReactPlayer
          ref={playerRef}
          url={src}
          width={Number.isNaN(width) ? width : `${width}px`}
          height={Number.isNaN(height) ? width : `${height}px`}
          playing={isPlaying}
          volume={(volume * 1.0) / 100}
          playbackRate={speed}
          loop={isLoopEnabled}
          progressInterval={progressInterval}
          onPlay={handlePlay}
          onPause={handlePause}
          onEnded={handleFinishPlaying}
          //   controls
          playsinline
        />
      </div>
    </div>
  );
}
