"use client";

import { useEffect, useState } from "react";

/**
 * Hook to detect if the device is touch-capable
 * Returns true for tablets, mobile devices, and any device with touch input
 */
export function useTouchDevice() {
    const [isTouchDevice, setIsTouchDevice] = useState(false);

    useEffect(() => {
        // Check multiple touch indicators for better detection
        const hasTouchScreen = (
            'ontouchstart' in window ||
            navigator.maxTouchPoints > 0 ||
            // @ts-ignore - for older browsers
            navigator.msMaxTouchPoints > 0
        );

        setIsTouchDevice(hasTouchScreen);
    }, []);

    return isTouchDevice;
}
