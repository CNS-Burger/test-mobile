"use client";

import {  useRef, useState } from "react";
// import StreamVisualizer from "./streamVisualizer";
import { Howl } from "howler";
import * as Tone from "tone";



export default function ContextAudio() {
  const audio = useRef<Howl>(undefined);
  // const pShift = useRef<Tone.PitchShift>(undefined);
  const analyser = useRef<AnalyserNode>(undefined);
  const [isPlaying, setIsPlaying] = useState(false);
  const [playbackRate, setPlaybackRate] = useState(1.0);
  // const [stream, setStream] = useState<MediaStream | null>(null);




  const createAudio = () => {
    audio.current = new Howl({
                src: ["/rateSample.mp3"],
                format: "mp3",
                html5: true,
                // autoplay: true,
                onplayerror: () => {
                    console.log("음원 파일 로드 실패");
                },
                onload: () => {
                    console.log("음원 파일 로드 완료");
                },
                onend: () => {
                    console.log("음원 파일 재생 완료");
                },
            });

            Howler.masterGain.disconnect();

            const context = Howler.ctx;
            Tone.setContext(context);

            const newAnalyser = Howler.ctx.createAnalyser();

            audio.current.rate(playbackRate);

            // if (!pShift.current) {
            //     pShift.current = new Tone.PitchShift();
            // }
            // pShift.current.set({
            //     context,
            //     pitch: playbackRate ?? 0,
            // });
            // pShift.current.connect(context.destination);
            // Tone.connect(Howler.masterGain, pShift.current);
            Tone.connect(Howler.masterGain, context.destination);

            analyser.current = newAnalyser;


  };


  const playAudio = () => {
    console.log("playAudio");
    audio.current?.play();
    setIsPlaying(true);
  };

  const pauseAudio = () => {
    console.log("pauseAudio");
    audio.current?.pause();
    setIsPlaying(false);
  };

  const changeSpeed = (speed: number) => {
    console.log("changeSpeed", speed);
    setPlaybackRate(speed);
    audio.current?.rate(speed);
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
        {/* <span>status1 : {status1}</span>
        <br />
        <span>status2 : {status2}</span> */}
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
      {/* <StreamVisualizer stream={stream} /> */}
    </div>
  );
}
