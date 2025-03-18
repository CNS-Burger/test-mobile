"use client";

import { useMemo } from "react";
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
            ["fullscreen", "standalone", "minimal-ui"].some(
                (displayMode) => window.matchMedia("(display-mode: " + displayMode + ")").matches
            )
        ); // Chrome PWA (supporting fullscreen, standalone, minimal-ui)
    }, []);

    const getDisplayMode = useMemo(() => {
        const modes = ["fullscreen", "standalone", "minimal-ui", "browser"];
        for (const mode of modes) {
            if (window.matchMedia(`(display-mode: ${mode})`).matches) {
                return mode;
            }
        }
        return "browser"; // 기본값
    }, []);

    const isStandalone = useMemo(() => {
        return window.matchMedia('(display-mode: standalone)').matches;
    }, []);
    const isFullscreen = useMemo(() => {
        return window.matchMedia('(display-mode: fullscreen)').matches;
    }, []);
    const isMinimalUi = useMemo(() => {
        return window.matchMedia('(display-mode: minimal-ui)').matches;
    }, []);
    const isBrowser = useMemo(() => {
        return window.matchMedia('(display-mode: browser)').matches;
    }, []);

  return <div>
    <h1>Browser: {browserName}</h1>
    <h1>OS: {osName}</h1>
    <h1>PWA: {isPWA ? "Yes" : "No"}</h1>
    <h1>Display Mode: {getDisplayMode}</h1>
    <h1>Is Standalone: {isStandalone ? "Yes" : "No"}</h1>
    <h1>Is Fullscreen: {isFullscreen ? "Yes" : "No"}</h1>
    <h1>Is Minimal UI: {isMinimalUi ? "Yes" : "No"}</h1>
    <h1>Is Browser: {isBrowser ? "Yes" : "No"}</h1>
    {/* <h1>Is Mobile: {isMobile() ? "Yes" : "No"}</h1> */}
  </div>;
}