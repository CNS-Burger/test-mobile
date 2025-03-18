"use client";

import dynamic from "next/dynamic";
// import DeviceInfo from "./DeviceInfo";
const DeviceInfo = dynamic(() => import("./DeviceInfo"), { ssr: false });

export default function Device() {
    return <div>
        <h1>Device</h1>
        <DeviceInfo />
    </div>;
}