import * as Haptics from "expo-haptics";

function clamp(number: number, min: number, max: number) {
  "worklet";

  return Math.min(Math.max(number, min), max);
}

function triggerHaptics() {
  Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
}

export { clamp, triggerHaptics };
