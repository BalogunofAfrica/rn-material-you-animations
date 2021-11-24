import * as Haptics from "expo-haptics";
import { Dimensions } from "react-native";
import { PanGestureHandlerGestureEvent } from "react-native-gesture-handler";
import {
  Extrapolate,
  interpolate,
  runOnJS,
  useAnimatedGestureHandler,
  useAnimatedProps,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from "react-native-reanimated";
import { CircleProps, PathProps, PolylineProps } from "react-native-svg";

// Type declaration
type Context = {
  translateX: number;
};

const { width } = Dimensions.get("window");
const space = 30;
const itemWidth = 100;
const leftClamp = -(width - (1.3 * itemWidth + space)) / 2;
const rightClamp = (width - (1.3 * itemWidth + space)) / 2;

const triggerHaptics = () => {
  Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
};

function useIncomingCallAnimation() {
  const translateX = useSharedValue(0);

  //   Declaring the various animation styles and props
  const actionStyle = useAnimatedStyle(() => {
    const opacity = interpolate(
      translateX.value,
      [leftClamp, 0, rightClamp],
      [0, 1, 0],
      Extrapolate.CLAMP
    );
    return { opacity };
  });

  const actionStyle2 = useAnimatedStyle(() => {
    const opacity = interpolate(
      translateX.value,
      [leftClamp, 0, rightClamp],
      [0, 1, 0],
      Extrapolate.CLAMP
    );
    return { opacity };
  });

  const circleOpacity = useAnimatedProps<CircleProps>(() => {
    const opacity = interpolate(
      translateX.value,
      [leftClamp, 0, rightClamp],
      [0, 1, 0],
      Extrapolate.CLAMP
    );
    return { strokeOpacity: opacity };
  });

  const pathOpacity = useAnimatedProps<PathProps>(() => {
    const opacity = interpolate(
      translateX.value,
      [leftClamp, 0, rightClamp],
      [0, 1, 0],
      Extrapolate.CLAMP
    );
    return { strokeOpacity: opacity };
  });

  const polyLinePath = useAnimatedProps<PolylineProps>(() => {
    const x1 = interpolate(
      translateX.value,
      [leftClamp + 20, 0, rightClamp + 20],
      [19, 15, 19],
      Extrapolate.CLAMP
    );
    const y2 = interpolate(
      translateX.value,
      [leftClamp + 20, 0, rightClamp + 20],
      [13, 15, 13],
      Extrapolate.CLAMP
    );
    const x3 = interpolate(
      translateX.value,
      [leftClamp + 20, 0, rightClamp + 20],
      [21, 19, 21],
      Extrapolate.CLAMP
    );
    const y3 = interpolate(
      translateX.value,
      [leftClamp + 20, 0, rightClamp + 20],
      [29, 17, 29],
      Extrapolate.CLAMP
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
      Extrapolate.CLAMP
    );
    return { transform: [{ rotate: `${rotate}deg` }] };
  });

  const swipeStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: translateX.value }],
  }));

  //   Handling gesture event
  const gestureHandler = useAnimatedGestureHandler<
    PanGestureHandlerGestureEvent,
    Context
  >({
    onActive: ({ translationX }, ctx) => {
      translateX.value = interpolate(
        ctx.translateX + translationX,
        [leftClamp, 0, rightClamp],
        [leftClamp, 0, rightClamp],
        Extrapolate.CLAMP
      );
    },
    onStart: (_, ctx) => {
      ctx.translateX = translateX.value;
    },
    onFinish: () => {
      translateX.value = withSpring(0);
      if (translateX.value <= leftClamp || translateX.value >= rightClamp) {
        runOnJS(triggerHaptics)();
      }
    },
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
