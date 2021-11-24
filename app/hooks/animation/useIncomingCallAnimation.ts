import * as Haptics from "expo-haptics";
import { useEffect } from "react";
import { Dimensions } from "react-native";
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
  withSpring,
  withTiming,
} from "react-native-reanimated";
import { PathProps } from "react-native-svg";

// Type declaration
type Context = {
  translateY: number;
};
type Accept = () => void;
type Decline = () => void;

// Constants
const dimm = Dimensions.get("window");

const triggerHaptics = () => {
  Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
};

// Hook
function useIncomingCallAnimation(accept: Accept, decline: Decline) {
  const gestureOpacity = useSharedValue(0);
  const gestureTranslate = useSharedValue(100);
  const repeatTranslate = useSharedValue(0);
  const swipe = useSharedValue(0);
  const textOpacity = useSharedValue(1);
  const titleTextOpacity = useSharedValue(1);
  const titleTextScale = useSharedValue(1);
  const titleTextTranslate = useSharedValue(0);

  const doRepeat = () => {
    "worklet";
    repeatTranslate.value = withRepeat(
      withTiming(-50, {
        duration: 1500,
      }),
      -1,
      true
    );
  };

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
      }
    );
    gestureOpacity.value = withTiming(1, { duration: 1000 });
  };

  //   Declaring the various animation styles and props
  const acceptStyle = useAnimatedStyle(() => ({ opacity: textOpacity.value }));

  const titleStyle = useAnimatedStyle(() => ({
    opacity: titleTextOpacity.value,
    transform: [
      { scale: titleTextScale.value },
      { translateY: titleTextTranslate.value },
    ],
  }));

  const declineOpacity = useAnimatedStyle(() => {
    const opacity = interpolate(
      repeatTranslate.value,
      [-50, 0],
      [0, 1],
      Extrapolate.CLAMP
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
      ["green", "#3A3B40", "red"]
    );
    return {
      backgroundColor: color,
    };
  });

  const iconProps = useAnimatedProps<PathProps>(() => {
    const color = interpolateColor(
      swipe.value,
      [-100, 0, 50],
      ["white", "green", "white"]
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
      Extrapolate.CLAMP
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
      // repeatTranslate.value = withTiming(repeatTranslate.value);
      repeatTranslate.value = 0;
      textOpacity.value = withTiming(0);
      titleTextOpacity.value = interpolate(
        translationY + context.translateY,
        [-200, 0, 100],
        [0, 1, 0],
        Extrapolate.CLAMP
      );
      titleTextScale.value = interpolate(
        translationY + context.translateY,
        [-dimm.height / 2, 0, dimm.height / 2],
        [0.7, 1, 0.7],
        Extrapolate.CLAMP
      );
      titleTextTranslate.value = interpolate(
        translationY + context.translateY,
        [-dimm.height / 2, 0, dimm.height / 2],
        [200, 0, 200],
        Extrapolate.CLAMP
      );
      swipe.value = interpolate(
        translationY + context.translateY,
        [-dimm.height / 2, dimm.height / 2],
        [-150, 150],
        Extrapolate.CLAMP
      );
    },
    onFinish: () => {
      swipe.value = withSpring(0);
      textOpacity.value = withTiming(1);
      if (swipe.value < -75) {
        runOnJS(triggerHaptics)();
        runOnJS(accept)();
      } else if (swipe.value >= 50) {
        runOnJS(triggerHaptics)();
        runOnJS(decline)();
      }
      titleTextOpacity.value = withTiming(1);
      titleTextScale.value = withTiming(1, { duration: 500 });
      titleTextTranslate.value = withTiming(0, { duration: 500 });
      repeatTranslate.value = withTiming(0);
      doRepeat();
    },
    onStart: (_, context) => {
      context.translateY = swipe.value;
    },
  });

  useEffect(() => {
    // The gesture animation called
    animate();
  }, [animate]);

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
