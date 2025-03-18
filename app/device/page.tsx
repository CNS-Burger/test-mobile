"use client";

import { UAParser } from "ua-parser-js";



export default function Device() {
    const ua = UAParser();
    const { browser, os } = ua;
    const { name: browserName } = browser ?? {};
    const { name: osName } = os ?? {};

const isPWA = () => {
    return (
        ("standalone" in window.navigator && window.navigator.standalone === true) || // iOS PWA Standalone
        document.referrer.includes("android-app://") || // Android Trusted Web App
        ["fullscreen", "standalone", "minimal-ui"].some(
            (displayMode) => window.matchMedia("(display-mode: " + displayMode + ")").matches
        )
    ); // Chrome PWA (supporting fullscreen, standalone, minimal-ui)
};

const getDisplayMode = () => {
    const modes = ["fullscreen", "standalone", "minimal-ui", "browser"];
    for (const mode of modes) {
        if (window.matchMedia(`(display-mode: ${mode})`).matches) {
            return mode;
        }
    }
    return "browser"; // 기본값
};

  return <div>
    <h1>Browser: {browserName}</h1>
    <h1>OS: {osName}</h1>
    <h1>PWA: {isPWA() ? "Yes" : "No"}</h1>
    <h1>Display Mode: {getDisplayMode()}</h1>
    {/* <h1>Is Mobile: {isMobile() ? "Yes" : "No"}</h1> */}
  </div>;
}
