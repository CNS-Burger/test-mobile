"use client";

import {  useMemo } from "react";
import { UAParser } from "ua-parser-js";

export default function Device() {
    const ua = UAParser();
    const { browser, os } = ua;
    const { name: browserName } = browser ?? {};
    const { name: osName } = os ?? {};


    const isPWA = useMemo(() => {
        return (
            ("standalone" in window.navigator && window.navigator.standalone === true) || // iOS PWA Standalone
            document.referrer.includes("android-app://") || // Android Trusted Web App
            window.matchMedia("(display-mode: standalone)").matches
        );
    }, []);

    // const isPWA = window.matchMedia(`(display-mode: standalone)`).matches;

    return <div>
        <h1>Browser: {browserName}</h1>
        <h1>OS: {osName}</h1>
        {/* <h1>PWA: {displayInfo.isPWA ? "Yes" : "No"}</h1> */}
        <h1>isPWA: {isPWA ? "Yes" : "No"}</h1>
        {/* <h1>Is Mobile: {isMobile() ? "Yes" : "No"}</h1> */}
    </div>;
}