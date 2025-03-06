// import dynamic from "next/dynamic";

// const CameraRecorder = dynamic(() => import("./CameraRecorder"), { ssr: false });
import CameraRecorder from "./CameraRecorder";

export default function Video3() {
    return (
        <>
        <h1>카메라 테스트</h1>
            <CameraRecorder />
        </>
    );
}