"use client";

import { useRef, useState } from "react";
import ReactPlayer from "react-player";

export default function VideoPage() {
  const playerRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isPlaying2, setIsPlaying2] = useState(false);
  const [isPlaying3, setIsPlaying3] = useState(false);
  const [isPlaying4, setIsPlaying4] = useState(false);
  const [src, setSrc] = useState("");

  const width = 340;
  const height = 180;
  const volume = 50;
  const speed = 1;
  const isLoopEnabled = false;
  const progressInterval = 1000;
  console.log(isPlaying);

  const handlePlay = (index: number) => {
    if (index === 1) {
      setIsPlaying(true);
      playerRef.current?.play();
    } else if (index === 2) {
      setIsPlaying2(true);
    } else if (index === 3) {
      setIsPlaying3(true);
    } else if (index === 4) {
      setIsPlaying4(true);
    }
  };

  const handlePause = (index: number) => {
    if (index === 1) {
      setIsPlaying(false);
      playerRef.current?.pause();
    } else if (index === 2) {
      setIsPlaying2(false);
    } else if (index === 3) {
      setIsPlaying3(false);
    } else if (index === 4) {
      setIsPlaying4(false);
    }
  };

  const handleFinishPlaying = (index: number) => {
    if (index === 1) {
      setIsPlaying(false);
    } else if (index === 2) {
      setIsPlaying2(false);
    } else if (index === 3) {
      setIsPlaying3(false);
    } else if (index === 4) {
      setIsPlaying4(false);
    }
  };

  return (
    <div>
      <h1>Version 1.0.5</h1>
      <div>
        <div>
          <h3>Video Player1</h3>
          <input
            type="text"
            value={src}
            onChange={(e) => setSrc(e.target.value)}
          />
          <button onClick={() => handlePlay(1)}>Play</button>
          <button onClick={() => handlePause(1)}>Pause</button>
          <button onClick={() => setSrc("")}>clear</button>
        </div>
        <div>
          <video ref={playerRef} width={width} height={height} src={src} />
        </div>
        <div>
          <video ref={playerRef} width={width} height={height} src={src}>
            <source type="video/webm" />
          </video>
        </div>
      </div>

      <div>
        <h3>Video Player2</h3>
        <input
          type="text"
          value={src}
          onChange={(e) => setSrc(e.target.value)}
        />
        <button onClick={() => handlePlay(2)}>Play</button>
        <button onClick={() => handlePause(2)}>Pause</button>
        <ReactPlayer
          url={src}
          width={Number.isNaN(width) ? width : `${width}px`}
          height={Number.isNaN(height) ? width : `${height}px`}
          playing={isPlaying2}
          volume={(volume * 1.0) / 100}
          playbackRate={speed}
          loop={isLoopEnabled}
          progressInterval={progressInterval}
          onPlay={() => handlePlay(2)}
          onPause={() => handlePause(2)}
          onEnded={() => handleFinishPlaying(2)}
          controls
          playsinline
        />
      </div>
      <div>
        <h3>Video Player3</h3>
        <input
          type="text"
          value={src}
          onChange={(e) => setSrc(e.target.value)}
        />
        <button onClick={() => handlePlay(3)}>Play</button>
        <button onClick={() => handlePause(3)}>Pause</button>
        <button onClick={() => setSrc("")}>clear</button>
        <ReactPlayer
          url={src}
          width={Number.isNaN(width) ? width : `${width}px`}
          height={Number.isNaN(height) ? width : `${height}px`}
          playing={isPlaying3}
          volume={(volume * 1.0) / 100}
          playbackRate={speed}
          loop={isLoopEnabled}
          progressInterval={progressInterval}
          onPlay={() => handlePlay(3)}
          onPause={() => handlePause(3)}
          onEnded={() => handleFinishPlaying(3)}
          //   controls
          playsinline
        />
      </div>
      <div>
        <h3>Video Player4</h3>
        <input
          type="text"
          value={src}
          onChange={(e) => setSrc(e.target.value)}
        />
        <button onClick={() => handlePlay(4)}>Play</button>
        <button onClick={() => handlePause(4)}>Pause</button>
        <ReactPlayer
          url={[{ src: src, type: "video/webm" }]}
          width={Number.isNaN(width) ? width : `${width}px`}
          height={Number.isNaN(height) ? width : `${height}px`}
          playing={isPlaying4}
          volume={(volume * 1.0) / 100}
          playbackRate={speed}
          loop={isLoopEnabled}
          progressInterval={progressInterval}
          onPlay={() => handlePlay(4)}
          onPause={() => handlePause(4)}
          onEnded={() => handleFinishPlaying(4)}
          controls
          playsinline
        />
      </div>
    </div>
  );
}
