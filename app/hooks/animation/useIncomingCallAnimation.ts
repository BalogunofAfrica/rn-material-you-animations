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
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
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
  const acceptStyle = useAnimatedStyle(() => ({ opacity: textOpacity.value }));

  const titleStyle = useAnimatedStyle(() => {
    const titleTextOpacity = interpolate(
      swipe.value,
      [minClamp, 0, maxClamp],
      [0, 1, 0],
      Extrapolate.CLAMP,
    );
    const titleTextScale = interpolate(
      swipe.value,
      [minClamp, 0, maxClamp],
      [0.7, 1, 0.7],
      Extrapolate.CLAMP,
    );
    const titleTextTranslate = interpolate(
      swipe.value,
      [minClamp, 0, maxClamp],
      [200, 0, 200],
      Extrapolate.CLAMP,
    );
    return {
      opacity: titleTextOpacity,
      transform: [
        { scale: titleTextScale },
        { translateY: titleTextTranslate },
      ],
    };
  });

  const declineOpacity = useAnimatedStyle(() => {
    const opacity = interpolate(
      repeatTranslate.value,
      [-50, 0],
      [0, 1],
      Extrapolate.CLAMP,
    );
    return { opacity };
  });

  const declineStyle = useAnimatedStyle(() => ({ opacity: textOpacity.value }));

  const gestureContainerStyle = useAnimatedStyle(() => ({
    opacity: gestureOpacity.value,
    transform: [{ translateY: gestureTranslate.value }],
  }));

  const iconContainerStyle = useAnimatedStyle(() => {
    const color = interpolateColor(
      swipe.value,
      [-100, 0, 50],
      ["green", "#3A3B40", "red"],
    );
    return {
      backgroundColor: color,
    };
  });

  const iconProps = useAnimatedProps<PathProps>(() => {
    const color = interpolateColor(
      swipe.value,
      [-100, 0, 50],
      ["white", "green", "white"],
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
      transform: [{ rotate: `${rotation}deg` }],
    };
  });

  const swipeStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: swipe.value }],
  }));

  //   Handling gesture event
  const gestureHandler = useAnimatedGestureHandler<
    PanGestureHandlerGestureEvent,
    Context
  >({
    onActive: ({ translationY }, context) => {
      const current = translationY + context.translateY;
      repeatTranslate.value = 0;
      textOpacity.value = withTiming(0);

      swipe.value = clamp(current, minClamp, maxClamp);
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

      // repeatTranslate.value = withTiming(0);
      doRepeat();
    },
    onStart: (_, context) => {
      context.translateY = swipe.value;
    },
  });

  useEffect(() => {
    const animate = () => {
      gestureTranslate.value = withTiming(
        0,
        {
          duration: 1000,
          easing: Easing.elastic(1),
        },
        (isFinished) => {
          if (isFinished) {
            doRepeat();
          }
        },
      );
      gestureOpacity.value = withTiming(1, { duration: 1000 });
    };
    // The gesture animation called
    animate();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return {
    acceptStyle,
    declineOpacity,
    declineStyle,
    gestureContainerStyle,
    gestureHandler,
    iconContainerStyle,
    iconProps,
    repeatTranslateStyle,
    rotationStyle,
    swipeStyle,
    titleStyle,
  };
}

export default useIncomingCallAnimation;
