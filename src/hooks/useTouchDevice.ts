"use client";

import { useEffect, useState } from "react";

/**
 * Hook to detect if the device is touch-capable
 * Returns true for tablets, mobile devices, and any device with touch input
 * 
 * Note: This hook detects touch capability at mount time and doesn't dynamically
 * update if touch capabilities change (e.g., external touchscreen connected).
 * This is intentional for simplicity and performance, as such scenarios are rare
 * and the component re-mounts on navigation.
 */
export function useTouchDevice() {
    const [isTouchDevice, setIsTouchDevice] = useState(false);

    useEffect(() => {
        // Check multiple touch indicators for better detection
        const hasTouchScreen = (
            'ontouchstart' in window ||
            navigator.maxTouchPoints > 0 ||
            // @ts-expect-error - msMaxTouchPoints exists in older IE/Edge browsers but not in TypeScript types
            navigator.msMaxTouchPoints > 0
        );

        setIsTouchDevice(hasTouchScreen);
    }, []);

    return isTouchDevice;
}
