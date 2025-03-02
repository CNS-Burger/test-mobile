"use client";

import { useEffect, useRef, useState } from "react";
import StreamVisualizer from "./streamVisualizer";

export default function ContextAudio() {
  const audioContextRef = useRef<AudioContext | null>(null);
  const sourceNodeRef = useRef<AudioBufferSourceNode | null>(null);
  const gainNodeRef = useRef<GainNode | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [playbackRate, setPlaybackRate] = useState(1.0);
  const [audioBuffer, setAudioBuffer] = useState<AudioBuffer | null>(null);
  const [stream, setStream] = useState<MediaStream | null>(null);

  useEffect(() => {
    return () => {
      stopAudio();
      audioContextRef.current?.close();
    };
  }, []);

  // 🎵 iOS Safari 호환을 위해 AudioContext 초기화
  const initializeAudioContext = async () => {
    if (!audioContextRef.current) {
      const audioCtx = new AudioContext();
      await audioCtx.resume(); // ✅ iOS에서 필수
      audioContextRef.current = audioCtx;
    }
  };

  // 🎵 오디오 파일 로드 및 디코딩
  const loadAudio = async () => {
    await initializeAudioContext();

    try {
      const response = await fetch("/rateSample.mp3");
      const arrayBuffer = await response.arrayBuffer();
      const decodedBuffer = await audioContextRef.current?.decodeAudioData(
        arrayBuffer
      );
      setAudioBuffer(decodedBuffer || null);
    } catch (error) {
      console.error("오디오 로드 오류:", error);
    }
  };

  // 🎵 오디오 재생/일시정지 토글
  const togglePlay = async () => {
    if (!audioBuffer || !audioContextRef.current) return;

    const audioCtx = audioContextRef.current;

    if (isPlaying) {
      await audioCtx.suspend();
      setIsPlaying(false);
    } else {
      if (audioCtx.state === "suspended") {
        await audioCtx.resume();
      } else {
        playAudio();
      }
      setIsPlaying(true);
    }
  };

  // 🎵 새로운 오디오 재생
  const playAudio = () => {
    if (!audioBuffer || !audioContextRef.current) return;

    stopAudio(); // 기존 오디오 정지

    const audioCtx = audioContextRef.current;
    const source = audioCtx.createBufferSource();
    const gainNode = audioCtx.createGain();

    source.buffer = audioBuffer;
    source.playbackRate.value = playbackRate; // ✅ 재생 속도 반영
    source.connect(gainNode);
    gainNode.connect(audioCtx.destination);

    // ✅ iOS Safari 버그 방지
    setTimeout(() => source.start(0), 0);

    source.onended = () => setIsPlaying(false);

    sourceNodeRef.current = source;
    gainNodeRef.current = gainNode;
    setIsPlaying(true);

    // 🎵 오디오 스트림 생성 및 저장
    const mediaStreamDestination = audioCtx.createMediaStreamDestination();
    gainNode.connect(mediaStreamDestination);
    setStream(mediaStreamDestination.stream);
  };

  // 🎵 오디오 정지
  const stopAudio = () => {
    if (audioContextRef.current?.state === "running") {
      audioContextRef.current.suspend();
    }
    sourceNodeRef.current?.stop();
    sourceNodeRef.current = null;
    setIsPlaying(false);
    setStream(null);
  };

  // 🎵 재생 속도 변경 기능
  const changeSpeed = (speed: number) => {
    setPlaybackRate(speed);
    if (isPlaying && sourceNodeRef.current) {
      sourceNodeRef.current.playbackRate.value = speed; // ✅ 현재 재생 중이면 즉시 반영
    }
  };

  return (
    <div style={{ textAlign: "center", padding: "20px" }}>
      <h2>오디오 플레이어 (AudioContext)</h2>
      <button onClick={loadAudio}>🎵 오디오 로드</button>
      <button onClick={togglePlay} style={{ marginLeft: "10px" }}>
        {isPlaying ? "일시정지" : "재생"}
      </button>
      <button onClick={stopAudio} style={{ marginLeft: "10px" }}>
        정지
      </button>

      <div style={{ marginTop: "10px" }}>
        <span>재생 속도: </span>
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

      <StreamVisualizer stream={stream} />
    </div>
  );
}
