"use client";

import React, { useEffect, useRef } from "react";
import useRecorder from "./useRecorder";

export default function CameraRecorder() {
    const { mediaStream, isRecording, startStream, startRecording, stopRecording, videoBlob } = useRecorder();
    const videoRef = useRef<HTMLVideoElement | null>(null);

    useEffect(() => {
        if (videoRef.current && mediaStream) {
            videoRef.current.srcObject = mediaStream;
        }
    }, [mediaStream]);

    return (
        <div>
            <h2>아이폰 크롬에서 녹화 테스트</h2>

            {/* 비디오 프리뷰 */}
            <video ref={videoRef} autoPlay muted style={{ width: "100%", height: "300px", background: "black" }} />

            {/* 녹화 버튼 */}
            <button onClick={startStream}>카메라 시작</button>
            <button onClick={startRecording} disabled={isRecording}>녹화 시작</button>
            <button onClick={stopRecording} disabled={!isRecording}>녹화 중지</button>

            {/* MP4 변환 후 다운로드 */}
            {videoBlob && (
                <div>
                    <h3>녹화 완료! MP4 다운로드 가능</h3>
                    <video controls src={URL.createObjectURL(videoBlob)} style={{ width: "100%" }} />
                    <a href={URL.createObjectURL(videoBlob)} download="recording.mp4">
                        MP4 다운로드
                    </a>
                </div>
            )}
        </div>
    );
}