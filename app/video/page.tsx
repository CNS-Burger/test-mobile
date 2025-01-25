"use client";

import { useRef, useState } from "react";
import ReactPlayer from "react-player";

export default function VideoPage() {
  const playerRef = useRef<ReactPlayer>(null);
  const playerRef2 = useRef<ReactPlayer>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isPlaying2, setIsPlaying2] = useState(false);
  const [src, setSrc] = useState("");

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

  const handlePlay2 = () => {
    setIsPlaying2(true);
  };

  const handlePause2 = () => {
    setIsPlaying2(false);
  };

  const handleFinishPlaying2 = () => {
    setIsPlaying2(false);
  };

  return (
    <div>
      <div>
        <h1>Video Player1</h1>
        <input
          type="text"
          value={src}
          onChange={(e) => setSrc(e.target.value)}
        />
        <button onClick={handlePlay}>Play</button>
        <button onClick={handlePause}>Pause</button>
        <button onClick={() => setSrc("")}>clear</button>
        <ReactPlayer
          ref={playerRef}
          url={[{ src: src, type: "video/webm" }]}
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
      <div>
        <h1>Video Player2</h1>
        <input
          type="text"
          value={src}
          onChange={(e) => setSrc(e.target.value)}
        />
        <button onClick={handlePlay}>Play</button>
        <button onClick={handlePause}>Pause</button>
        <ReactPlayer
          ref={playerRef2}
          url={src}
          width={Number.isNaN(width) ? width : `${width}px`}
          height={Number.isNaN(height) ? width : `${height}px`}
          playing={isPlaying2}
          volume={(volume * 1.0) / 100}
          playbackRate={speed}
          loop={isLoopEnabled}
          progressInterval={progressInterval}
          onPlay={handlePlay2}
          onPause={handlePause2}
          onEnded={handleFinishPlaying2}
          controls
          playsinline
        />
      </div>
    </div>
  );
}
