"use client";

import { useEffect, useRef, useState } from "react";

export default function ClassicAudio() {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [playbackRate, setPlaybackRate] = useState(1.0);

  useEffect(() => {
    audioRef.current = new Audio("/rateSample.mp3"); // 오디오 파일 경로 지정
    audioRef.current.addEventListener("ended", () => setIsPlaying(false));
    return () => {
      audioRef.current?.pause();
      audioRef.current = null;
    };
  }, []);

  const togglePlay = () => {
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  const changeSpeed = (speed: number) => {
    if (!audioRef.current) return;
    audioRef.current.playbackRate = speed;
    setPlaybackRate(speed);
  };

  return (
    <div style={{ textAlign: "center", padding: "20px" }}>
      <h2>오디오 플레이어</h2>
      <button onClick={togglePlay}>{isPlaying ? "일시정지" : "재생"}</button>
      <div style={{ marginTop: "10px" }}>
        <span>재생 속도:</span>
        {[0.5, 1, 1.5, 2].map((speed) => (
          <button
            key={speed}
            onClick={() => changeSpeed(speed)}
            style={{
              marginLeft: "5px",
              fontWeight: playbackRate === speed ? "bold" : "normal",
            }}
          >
            {speed}x
          </button>
        ))}
      </div>
    </div>
  );
}
