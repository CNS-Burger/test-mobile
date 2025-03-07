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
  const [startedAudio, setStartedAudio] = useState(false);
  const [stream, setStream] = useState<MediaStream | null>(null);

  const [status1, setStatus1] = useState<string>("");
  const [status2, setStatus2] = useState<string>("");
  //   const [status3, setStatus3] = useState<string>("");
  //   const [status4, setStatus4] = useState<string>("");

  useEffect(() => {
    // audioContextRef.current = new AudioContext();

    // loadAudio("/rateSample.mp3");

    return () => {
      stopAudio();
      audioContextRef.current?.close();
    };
  }, []);

  const createAudio = async () => {
    audioContextRef.current = new AudioContext();
    // const audio = new Audio();
    // console.log("audio : ", audio);

    console.log("status1 : ", audioContextRef.current.state);
    setStatus1(audioContextRef.current.state);
    await audioContextRef.current.resume();
    console.log("status2 : ", audioContextRef.current.state);
    setStatus2(audioContextRef.current.state);
    loadAudio("/rateSample.mp3");
  };

  // 오디오 파일 로드 및 디코딩
  const loadAudio = async (url: string) => {
    console.log("loadAudio");

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
  const playAudio = async () => {
    if (!audioContextRef.current) return;

    if (audioContextRef.current.state === "suspended") {
      await audioContextRef.current.resume();
      console.log("AudioContext resumed before play");
    }

    if (!startedAudio) {
      if (!audioBuffer || !audioContextRef.current) return;

      const audioCtx = audioContextRef.current;
      const source = audioCtx.createBufferSource();
      const gainNode = audioCtx.createGain();
      gainNode.gain.value = 1.0; // 볼륨 기본값 설정

      console.log("현재 볼륨:", gainNode.gain.value);

      const streamDestination = audioCtx.createMediaStreamDestination();
      const newStream = streamDestination.stream;
      setStream(newStream);

      // 연결 순서 보장 (출력 활성화)
      source.buffer = audioBuffer;
      source.connect(gainNode);
      gainNode.connect(audioCtx.destination);
      source.connect(streamDestination); // 스트림 연결

      setTimeout(() => {
        source.start(0);
        console.log("오디오 재생 시작됨");
      }, 0);

      source.onended = () => setIsPlaying(false);

      sourceNodeRef.current = source;
      gainNodeRef.current = gainNode;
      setIsPlaying(true);
      setStartedAudio(true);
    } else {
      audioContextRef.current?.resume();
      setIsPlaying(true);
    }
  };

  // 오디오 정지
  const pauseAudio = () => {
    console.log("pauseAudio");
    audioContextRef.current?.suspend();
    // sourceNodeRef.current?.stop();
    // sourceNodeRef.current = null;
    setIsPlaying(false);
  };

  // 재생 속도 변경
  const changeSpeed = (speed: number) => {
    console.log("changeSpeed", speed);
    setPlaybackRate(speed);
    if (sourceNodeRef.current) {
      sourceNodeRef.current.playbackRate.value = speed;
      //   sourceNodeRef.current.de;
    }
    if (isPlaying) {
      playAudio(); // 변경된 속도로 다시 재생
    }
  };

  // 오디오 완전히 정지 (재개 불가)
  const stopAudio = () => {
    if (audioContextRef.current?.state === "running") {
      audioContextRef.current.suspend();
    }
    sourceNodeRef.current?.stop();
    sourceNodeRef.current = null;
    setIsPlaying(false);
  };

  return (
    <div style={{ textAlign: "center", padding: "20px" }}>
      <h2>오디오 플레이어 (AudioContext)</h2>
      <button onClick={createAudio} style={{ marginRight: "10px" }}>
        오디오 생성
      </button>
      <button onClick={isPlaying ? pauseAudio : playAudio}>
        {isPlaying ? "일시정지" : "재생"}
      </button>
      <div>
        <span>status1 : {status1}</span>
        <br />
        <span>status2 : {status2}</span>
        {/* <br />
        <span>status3 : {status3}</span>
        <br />
        <span>status4 : {status4}</span> */}
      </div>
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
      <StreamVisualizer stream={stream} />
    </div>
  );
}
