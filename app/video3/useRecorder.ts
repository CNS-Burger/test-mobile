import { useState, useRef, useCallback } from "react";



export default function useRecorder() {
  const [mediaStream, setMediaStream] = useState<MediaStream | null>(null);
  const [isRecording, setIsRecording] = useState(false);
  const [videoBlob, setVideoBlob] = useState<Blob | null>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const recordedChunks = useRef<Blob[]>([]);



  // 🎥 1️⃣ 카메라 스트림 가져오기
  const startStream = useCallback(async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { width: 1280, height: 720 },
        audio: true,
      });
      setMediaStream(stream);
    } catch (error) {
      console.error("Error accessing camera:", error);
    }
  }, []);

  // ⏺ 2️⃣ 녹화 시작
  const startRecording = useCallback(() => {
    if (!mediaStream) return;

    recordedChunks.current = [];
    const recorder = new MediaRecorder(mediaStream, {
      mimeType: "video/mp4", // WebM 형식으로 녹화
    });

    recorder.ondataavailable = (event) => {
      if (event.data.size > 0) {
        recordedChunks.current.push(event.data);
      }
    };

    recorder.onstop = async () => {
      const mp4Blob = new Blob(recordedChunks.current, { type: "video/mp4" });
    //   const mp4Blob = await convertWebMToMP4(webmBlob);
      setVideoBlob(mp4Blob);
    };

    mediaRecorderRef.current = recorder;
    recorder.start();
    setIsRecording(true);
  }, [mediaStream]);

  // ⏹ 3️⃣ 녹화 중지
  const stopRecording = useCallback(() => {
    mediaRecorderRef.current?.stop();
    setIsRecording(false);
  }, []);

 
  return {
    mediaStream,
    isRecording,
    startStream,
    startRecording,
    stopRecording,
    videoBlob,
  };
}
