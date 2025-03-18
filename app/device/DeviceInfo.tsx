"use client";

import {  useMemo } from "react";
import { UAParser } from "ua-parser-js";

export default function Device() {
    const ua = UAParser();
    const { browser, os, device } = ua;
    const { name: browserName } = browser ?? {};
    const { name: osName } = os ?? {};
    const { model, type, vendor } = device ?? {};

    const isPWA = useMemo(() => {
        return (
            ("standalone" in window.navigator && window.navigator.standalone === true) || // iOS PWA Standalone
            document.referrer.includes("android-app://") || // Android Trusted Web App
            window.matchMedia("(display-mode: standalone)").matches
        );
    }, []);

    return <div>
        <h1>Browser: {browserName}</h1>
        <h1>OS: {osName}</h1>
        <h1>isPWA: {isPWA ? "Yes" : "No"}</h1>
        <h1>Device: {model}, {type}, {vendor}</h1>
    </div>;
}