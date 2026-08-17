/**
 * AdhanManager - Renderless component that monitors prayer times and triggers Adhan
 * 
 * Features:
 * - Polls prayer times every 10 seconds
 * - Uses Page Visibility API to check for missed prayers when app returns to foreground
 * - Sends browser notifications when app is in background
 */

import { useEffect, useRef } from 'react';
import { usePrayerTimes } from '../hooks/usePrayerTimes';
import { useAdhan } from '../contexts/AdhanContext';

// Prayer name mappings
const PRAYER_NAMES: Record<string, { en: string; ar: string }> = {
    fajr: { en: 'Fajr', ar: 'الفجر' },
    dhuhr: { en: 'Dhuhr', ar: 'الظهر' },
    asr: { en: 'Asr', ar: 'العصر' },
    maghrib: { en: 'Maghrib', ar: 'المغرب' },
    isha: { en: 'Isha', ar: 'العشاء' },
};

// Check if now is within ±windowSeconds of the target time
const isWithinWindow = (target: Date, windowSeconds: number = 30): boolean => {
    const now = new Date();
    const diff = Math.abs(now.getTime() - target.getTime());
    return diff <= windowSeconds * 1000;
};

// Check if a prayer was recently missed (within the past 5 minutes)
const wasRecentlyMissed = (target: Date, maxAgoMinutes: number = 5): boolean => {
    const now = new Date();
    const diff = now.getTime() - target.getTime();
    return diff > 0 && diff <= maxAgoMinutes * 60 * 1000;
};

export const AdhanManager: React.FC = () => {
    const { prayerTimes } = usePrayerTimes();
    const { triggerAdhan } = useAdhan();
    const lastCheckedRef = useRef<string>('');

    // Core check function - reused by both interval and visibility handler
    const checkPrayerTimes = (windowSec: number = 30) => {
        if (!prayerTimes) return;

        const prayers = ['fajr', 'dhuhr', 'asr', 'maghrib', 'isha'] as const;

        for (const prayerKey of prayers) {
            const prayerTime = prayerTimes[prayerKey];
            if (!prayerTime || !(prayerTime instanceof Date)) continue;

            if (isWithinWindow(prayerTime, windowSec)) {
                const checkKey = `${prayerKey}-${prayerTime.toISOString()}`;
                if (lastCheckedRef.current === checkKey) continue;

                lastCheckedRef.current = checkKey;
                const names = PRAYER_NAMES[prayerKey];
                // removed: console.log(`[AdhanManager] Prayer time detected: ${names.en} at ${prayerTime.toLocaleTimeString()}`);
                triggerAdhan(names.en, names.ar);
                break;
            }
        }
    };

    // Regular polling
    useEffect(() => {
        if (!prayerTimes) return;

        const checkInterval = setInterval(() => checkPrayerTimes(30), 10000);
        return () => clearInterval(checkInterval);
    }, [prayerTimes, triggerAdhan]);

    // Page Visibility API: Check for missed prayers when app returns to foreground
    useEffect(() => {
        const handleVisibilityChange = () => {
            if (document.visibilityState !== 'visible' || !prayerTimes) return;

            // removed: console.log('[AdhanManager] App returned to foreground - checking for missed prayers');
            const prayers = ['fajr', 'dhuhr', 'asr', 'maghrib', 'isha'] as const;

            for (const prayerKey of prayers) {
                const prayerTime = prayerTimes[prayerKey];
                if (!prayerTime || !(prayerTime instanceof Date)) continue;

                // Check if prayer was missed in the last 5 minutes
                if (wasRecentlyMissed(prayerTime, 5)) {
                    const checkKey = `${prayerKey}-${prayerTime.toISOString()}`;
                    if (lastCheckedRef.current === checkKey) continue;

                    lastCheckedRef.current = checkKey;
                    const names = PRAYER_NAMES[prayerKey];
                    // removed: console.log(`[AdhanManager] Missed prayer detected on foreground: ${names.en}`);
                    triggerAdhan(names.en, names.ar);
                    break;
                }
            }
        };

        document.addEventListener('visibilitychange', handleVisibilityChange);
        return () => document.removeEventListener('visibilitychange', handleVisibilityChange);
    }, [prayerTimes, triggerAdhan]);

    // This is a renderless component
    return null;
};
