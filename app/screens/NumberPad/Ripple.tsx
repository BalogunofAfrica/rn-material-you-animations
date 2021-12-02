import React, { ReactNode } from "react";
import { StyleProp, View, ViewStyle } from "react-native";
import {
  TapGestureHandler,
  TapGestureHandlerGestureEvent,
} from "react-native-gesture-handler";
import Animated, {
  measure,
  runOnJS,
  useAnimatedGestureHandler,
  useAnimatedRef,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";

interface RippleProps {
  children?: ReactNode;
  onPress?: () => void;
  style?: StyleProp<ViewStyle>;
}

function Ripple({ children, onPress, style }: RippleProps) {
  const centerX = useSharedValue(0);
  const centerY = useSharedValue(0);
  const scale = useSharedValue(0);

  const aRef = useAnimatedRef<Animated.View>();
  const height = useSharedValue(0);
  const width = useSharedValue(0);

  const radius = useSharedValue(100);

  const opacity = useSharedValue(1);

  const gestureHandler =
    useAnimatedGestureHandler<TapGestureHandlerGestureEvent>({
      onActive: () => {
        if (onPress) runOnJS(onPress)();
      },
      onFinish: () => {
        //
      },
      onStart: ({ x, y }) => {
        const layout = measure(aRef);
        width.value = layout.width;
        height.value = layout.height;

        centerX.value = x;
        centerY.value = y;

        opacity.value = withTiming(1);
        radius.value = withTiming(50, { duration: 350 }, () => {
          radius.value = withTiming(100);
        });
        scale.value = withTiming(1, { duration: 1000 }, () => {
          scale.value = 0;
          opacity.value = withTiming(0);
        });
      },
    });

  const rstyle = useAnimatedStyle(() => {
    const circleRadius = Math.sqrt(height.value ** 2 + width.value ** 2);

    const translateX = centerX.value - circleRadius;
    const translateY = centerY.value - circleRadius;

    return {
      backgroundColor: "rgba(255,0,0,0.3)",
      borderRadius: circleRadius,
      height: circleRadius * 2,
      left: 0,
      opacity: opacity.value,
      position: "absolute",
      top: 0,
      transform: [{ translateX }, { translateY }, { scale: scale.value }],
      width: circleRadius * 2,
    };
  });

  const styleee = useAnimatedStyle(() => ({ borderRadius: radius.value }));
  const styleee2 = useAnimatedStyle(() => ({ borderRadius: radius.value }));

  return (
    <Animated.View ref={aRef} style={[style, styleee]}>
      <TapGestureHandler onGestureEvent={gestureHandler}>
        <Animated.View style={[style, styleee2, { overflow: "hidden" }]}>
          <View>{children}</View>
          <Animated.View style={rstyle} />
        </Animated.View>
      </TapGestureHandler>
    </Animated.View>
  );
}

export default Ripple;
