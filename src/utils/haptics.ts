/**
 * Haptic feedback utility using Web Vibration API
 */
export function triggerHaptic(duration = 20) {
  if (typeof window !== 'undefined' && 'navigator' in window && 'vibrate' in navigator) {
    try {
      navigator.vibrate(duration);
    } catch {
      // Ignore if not supported or disabled by browser permissions
    }
  }
}

export function triggerHapticPattern(pattern: number[]) {
  if (typeof window !== 'undefined' && 'navigator' in window && 'vibrate' in navigator) {
    try {
      navigator.vibrate(pattern);
    } catch {
      // Ignore
    }
  }
}
