import Animated, {
  Easing,
  runOnJS,
  useAnimatedReaction,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";

export default function useTranslatorAnimation(
  translateX: Animated.SharedValue<number>
) {
  const borderRadius = useSharedValue(0);
  const opacity = useSharedValue(1);
  const opacity2 = useSharedValue(1);
  // We set the initial values of width and width2 to a value larger than 0 so that they
  // do not react to their shared value yet, the reaction we want to trigger on layout is the one
  //  with translateX
  const width = useSharedValue(1);
  const width2 = useSharedValue(1);

  const animate1 = () => {
    opacity.value = withTiming(1, { duration: 300 });
    borderRadius.value = withTiming(35, {
      duration: 800,
      easing: Easing.linear,
    });
    width.value = withTiming(100, { duration: 1000 }, () => {
      opacity.value = withTiming(0, { duration: 500 }, () => {
        width.value = withTiming(0, { duration: 500 });
        borderRadius.value = withTiming(0);
      });
    });
  };

  const animate2 = () => {
    opacity2.value = withTiming(1, { duration: 300 });
    borderRadius.value = withTiming(35, {
      duration: 800,
      easing: Easing.linear,
    });
    width2.value = withTiming(100, { duration: 1000 }, () => {
      opacity2.value = withTiming(0, { duration: 500 }, () => {
        width2.value = withTiming(0, { duration: 500 });
        borderRadius.value = withTiming(0);
      });
    });
  };

  useAnimatedReaction(
    () => width.value,
    () => {
      if (width.value === 0) {
        runOnJS(animate2)();
      }
    }
  );

  useAnimatedReaction(
    () => width2.value,
    () => {
      if (width2.value === 0) {
        runOnJS(animate1)();
      }
    }
  );

  useAnimatedReaction(
    () => translateX.value,
    () => {
      if (translateX.value !== 0) {
        borderRadius.value = 0;
        opacity.value = 0;
        opacity2.value = 0;
        width.value = 0;
        width2.value = 0;
      } else {
        runOnJS(animate1)();
      }
    }
  );

  const widthstyle = useAnimatedStyle(() => {
    return {
      width: `${width.value}%`,
      opacity: opacity.value,
      borderRadius: borderRadius.value,
    };
  });
  const widthstyle2 = useAnimatedStyle(() => {
    return {
      width: `${width2.value}%`,
      opacity: opacity2.value,
      borderRadius: borderRadius.value,
    };
  });

  return {
    widthstyle,
    widthstyle2,
  };
}
