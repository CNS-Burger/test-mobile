"use client";

import { useEffect, useRef, useState } from "react";

export default function ContextAudio() {
  const audioContextRef = useRef<AudioContext | null>(null);
  const sourceNodeRef = useRef<AudioBufferSourceNode | null>(null);
  const gainNodeRef = useRef<GainNode | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [playbackRate, setPlaybackRate] = useState(1.0);
  const [audioBuffer, setAudioBuffer] = useState<AudioBuffer | null>(null);

  useEffect(() => {
    audioContextRef.current = new AudioContext();
    loadAudio("/rateSample.mp3");

    return () => {
      stopAudio();
      audioContextRef.current?.close();
    };
  }, []);

  // 오디오 파일 로드 및 디코딩
  const loadAudio = async (url: string) => {
    try {
      const response = await fetch(url);
      const arrayBuffer = await response.arrayBuffer();
      const decodedBuffer = await audioContextRef.current?.decodeAudioData(
        arrayBuffer
      );
      setAudioBuffer(decodedBuffer || null);
    } catch (error) {
      console.error("오디오 로드 오류:", error);
    }
  };

  // 오디오 재생
  const playAudio = () => {
    if (!audioBuffer || !audioContextRef.current) return;

    stopAudio(); // 기존 재생 중인 오디오 정지

    const audioCtx = audioContextRef.current;
    const source = audioCtx.createBufferSource();
    const gainNode = audioCtx.createGain();

    source.buffer = audioBuffer;
    source.playbackRate.value = playbackRate; // 재생 속도 설정
    source.connect(gainNode);
    gainNode.connect(audioCtx.destination);

    source.start(0);
    source.onended = () => setIsPlaying(false);

    sourceNodeRef.current = source;
    gainNodeRef.current = gainNode;
    setIsPlaying(true);
  };

  // 오디오 정지
  const stopAudio = () => {
    console.log("stopAudio");
    if (audioContextRef.current?.state === "running") {
      audioContextRef.current.suspend();
    }
    sourceNodeRef.current?.stop();
    sourceNodeRef.current = null;
    setIsPlaying(false);
  };

  // 재생 속도 변경
  const changeSpeed = (speed: number) => {
    setPlaybackRate(speed);
    if (isPlaying) {
      playAudio(); // 변경된 속도로 다시 재생
    }
  };

  return (
    <div style={{ textAlign: "center", padding: "20px" }}>
      <h2>오디오 플레이어 (AudioContext)</h2>
      <button onClick={isPlaying ? stopAudio : playAudio}>
        {isPlaying ? "일시정지" : "재생"}
      </button>
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
