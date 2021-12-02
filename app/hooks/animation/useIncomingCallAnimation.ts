import { useEffect } from "react";
import { PanGestureHandlerGestureEvent } from "react-native-gesture-handler";
import {
  Easing,
  Extrapolate,
  interpolate,
  interpolateColor,
  runOnJS,
  useAnimatedGestureHandler,
  useAnimatedProps,
  useAnimatedReaction,
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withSequence,
  withTiming,
} from "react-native-reanimated";
import { PathProps } from "react-native-svg";

import { clamp, triggerHaptics } from "./util";

// Type declaration
type Accept = () => void;
type Context = {
  translateY: number;
};
type Decline = () => void;

// Constants
const maxClamp = 60;
const minClamp = -80;

// Hook
function useIncomingCallAnimation(accept: Accept, decline: Decline) {
  const gestureOpacity = useSharedValue(0);
  const gestureTranslate = useSharedValue(100);
  const repeatTranslate = useSharedValue(0);
  const swipe = useSharedValue(0);
  const textOpacity = useSharedValue(1);
  const vibration = useSharedValue(0);

  const doRepeat = () => {
    "worklet";

    repeatTranslate.value = withRepeat(
      withTiming(-50, {
        duration: 1500,
      }),
      -1,
      true,
    );
  };

  //   Declaring the various animation styles and props
  const acceptOpacity = useAnimatedStyle(() => ({
    opacity: textOpacity.value,
  }));

  const declineOpacity = useAnimatedStyle(() => {
    const opacity = interpolate(
      repeatTranslate.value,
      [-50, 0],
      [0, 1],
      Extrapolate.CLAMP,
    );
    return {
      opacity: repeatTranslate.value === 0 ? textOpacity.value : opacity,
    };
  });

  const gestureContainerStyle = useAnimatedStyle(() => ({
    opacity: gestureOpacity.value,
    transform: [{ translateY: gestureTranslate.value }],
  }));

  const headingStyle = useAnimatedStyle(() => {
    const opacity = interpolate(
      swipe.value,
      [minClamp, 0, maxClamp],
      [0, 1, 0],
      Extrapolate.CLAMP,
    );
    const scale = interpolate(
      swipe.value,
      [minClamp, 0, maxClamp],
      [0.7, 1, 0.7],
      Extrapolate.CLAMP,
    );
    const translateY = interpolate(
      swipe.value,
      [minClamp, 0, maxClamp],
      [200, 0, 200],
      Extrapolate.CLAMP,
    );
    return {
      opacity,
      transform: [{ scale }, { translateY }],
    };
  });

  const iconProps = useAnimatedProps<PathProps>(() => {
    const color = interpolateColor(
      swipe.value,
      [-50, 0, 50],
      ["#ffffff", "#00ff00", "#ffffff"],
    );
    return {
      stroke: color,
    };
  });

  const repeatTranslateStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: repeatTranslate.value }],
  }));

  const rotationStyle = useAnimatedStyle(() => {
    const rotation = interpolate(
      swipe.value,
      [10, 40],
      [0, 135],
      Extrapolate.CLAMP,
    );
    return {
      transform: [
        {
          rotate: `${
            repeatTranslate.value === 0 && swipe.value >= 10
              ? rotation
              : vibration.value
          }deg`,
        },
      ],
    };
  });

  const swipeStyle = useAnimatedStyle(() => {
    const backgroundColor = interpolateColor(
      swipe.value,
      [-50, 0, 50],
      ["#00ff00", "#3A3B40", "#ff0000"],
    );
    return {
      backgroundColor,
      transform: [{ translateY: swipe.value }],
    };
  });

  //   Handling gesture event
  const gestureHandler = useAnimatedGestureHandler<
    PanGestureHandlerGestureEvent,
    Context
  >({
    onActive: ({ translationY }, context) => {
      repeatTranslate.value = 0;
      const current = translationY + context.translateY;
      swipe.value = clamp(current, minClamp, maxClamp);
      textOpacity.value = withTiming(0);
    },
    onFinish: () => {
      swipe.value = withTiming(0, { easing: Easing.inOut(Easing.linear) });
      textOpacity.value = withTiming(1);

      if (swipe.value <= minClamp) {
        runOnJS(triggerHaptics)();
        runOnJS(accept)();
      } else if (swipe.value >= maxClamp) {
        runOnJS(triggerHaptics)();
        runOnJS(decline)();
      }

      doRepeat();
    },
    onStart: (_, context) => {
      context.translateY = swipe.value;
    },
  });

  //   Handling reactions and effects
  useAnimatedReaction(
    () => repeatTranslate.value,
    (prep) => {
      if (prep === -50) {
        vibration.value = withSequence(
          withTiming(-8, { duration: 25 }),
          withRepeat(withTiming(8, { duration: 50 }), 12, true),
          withTiming(0, { duration: 25 }),
        );
      }
    },
  );

  useEffect(() => {
    gestureTranslate.value = withTiming(
      0,
      { duration: 1000, easing: Easing.elastic(1) },
      (isFinished) => {
        if (isFinished) {
          doRepeat();
        }
      },
    );
    gestureOpacity.value = withTiming(1, { duration: 1000 });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return {
    acceptOpacity,
    declineOpacity,
    gestureContainerStyle,
    gestureHandler,
    headingStyle,
    iconProps,
    repeatTranslateStyle,
    rotationStyle,
    swipeStyle,
  };
}

export default useIncomingCallAnimation;
