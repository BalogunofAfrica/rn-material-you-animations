import { Dimensions } from "react-native";
import { Gesture } from "react-native-gesture-handler";
import {
  Extrapolate,
  interpolate,
  runOnJS,
  useAnimatedProps,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from "react-native-reanimated";
import { CircleProps, PathProps, PolylineProps } from "react-native-svg";

import { clamp, triggerHaptics } from "./util";

// Constants
const { width } = Dimensions.get("window");
const space = 30;
const itemWidth = 100;
const leftClamp = -(width - (1.3 * itemWidth + space)) / 2;
const rightClamp = (width - (1.3 * itemWidth + space)) / 2;

// Hook
function useIncomingCallAnimation() {
  const context = useSharedValue({ translateX: 0 });
  const translateX = useSharedValue(0);

  // Declaring the various animation styles and props
  const actionStyle = useAnimatedStyle(() => {
    const opacity = interpolate(
      translateX.value,
      [leftClamp, 0, rightClamp],
      [0, 1, 0],
      Extrapolate.CLAMP,
    );
    return { opacity };
  });

  const actionStyle2 = useAnimatedStyle(() => {
    const opacity = interpolate(
      translateX.value,
      [leftClamp, 0, rightClamp],
      [0, 1, 0],
      Extrapolate.CLAMP,
    );
    return { opacity };
  });

  const circleOpacity = useAnimatedProps<CircleProps>(() => {
    const opacity = interpolate(
      translateX.value,
      [leftClamp, 0, rightClamp],
      [0, 1, 0],
      Extrapolate.CLAMP,
    );
    return { strokeOpacity: opacity };
  });

  const pathOpacity = useAnimatedProps<PathProps>(() => {
    const opacity = interpolate(
      translateX.value,
      [leftClamp, 0, rightClamp],
      [0, 1, 0],
      Extrapolate.CLAMP,
    );
    return { strokeOpacity: opacity };
  });

  const polyLinePath = useAnimatedProps<PolylineProps>(() => {
    const x1 = interpolate(
      translateX.value,
      [leftClamp + 20, 0, rightClamp + 20],
      [19, 15, 19],
      Extrapolate.CLAMP,
    );
    const y2 = interpolate(
      translateX.value,
      [leftClamp + 20, 0, rightClamp + 20],
      [13, 15, 13],
      Extrapolate.CLAMP,
    );
    const x3 = interpolate(
      translateX.value,
      [leftClamp + 20, 0, rightClamp + 20],
      [21, 19, 21],
      Extrapolate.CLAMP,
    );
    const y3 = interpolate(
      translateX.value,
      [leftClamp + 20, 0, rightClamp + 20],
      [29, 17, 29],
      Extrapolate.CLAMP,
    );
    const points = `${x1} 9 15 ${y2} ${x3} ${y3}`;
    return {
      points,
    };
  });

  const rotateStyle = useAnimatedStyle(() => {
    const rotate = interpolate(
      translateX.value,
      [leftClamp, 0, rightClamp],
      [-460, 0, 260],
      Extrapolate.CLAMP,
    );
    return { transform: [{ rotate: `${rotate}deg` }] };
  });

  const swipeStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: translateX.value }],
  }));

  // Handling gesture event
  const gestureHandler = Gesture.Pan()
    .onStart(() => {
      context.value.translateX = translateX.value;
    })
    .onUpdate(({ translationX }) => {
      const current = context.value.translateX + translationX;
      translateX.value = clamp(current, leftClamp, rightClamp);
    })
    .onEnd(() => {
      translateX.value = withSpring(0);
      if (translateX.value <= leftClamp || translateX.value >= rightClamp) {
        runOnJS(triggerHaptics)();
      }
    });

  return {
    actionStyle,
    actionStyle2,
    circleOpacity,
    gestureHandler,
    pathOpacity,
    polyLinePath,
    rotateStyle,
    swipeStyle,
    translateX,
  };
}

export default useIncomingCallAnimation;
