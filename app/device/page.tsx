"use client";

import { UAParser } from "ua-parser-js";

const isPWA = () => {
    return (
        ("standalone" in window.navigator && window.navigator.standalone === true) || // iOS PWA Standalone
        document.referrer.includes("android-app://") || // Android Trusted Web App
        ["fullscreen", "standalone", "minimal-ui"].some(
            (displayMode) => window.matchMedia("(display-mode: " + displayMode + ")").matches
        )
    ); // Chrome PWA (supporting fullscreen, standalone, minimal-ui)
};

export default function Device() {
    const ua = UAParser();
    const { browser, os } = ua;
    const { name: browserName } = browser ?? {};
    const { name: osName } = os ?? {};



  return <div>
    <h1>Browser: {browserName}</h1>
    <h1>OS: {osName}</h1>
    <h1>PWA: {isPWA() ? "Yes" : "No"}</h1>
  </div>;
}
