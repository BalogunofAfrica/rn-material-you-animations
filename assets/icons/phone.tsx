import * as React from "react";
import { StyleProp, ViewStyle } from "react-native";
import Animated from "react-native-reanimated";
import Svg, { Path, PathProps, SvgProps } from "react-native-svg";

const AnimatedPath = Animated.createAnimatedComponent(Path);

interface IconProps extends SvgProps {
  animatedProps?: Partial<Animated.AnimateProps<PathProps>> | undefined;
  rotationStyle?: StyleProp<Animated.AnimateStyle<StyleProp<ViewStyle>>>;
}

function PhoneIcon(props: IconProps) {
  return (
    <Animated.View style={props.rotationStyle}>
      <Svg fill="none" height={24} width={24} {...props}>
        <AnimatedPath
          animatedProps={props.animatedProps}
          d="M3.51 2l3.64.132A1.961 1.961 0 018.89 3.37l1.077 2.662c.25.62.183 1.326-.18 1.884l-1.379 2.121c.817 1.173 3.037 3.919 5.388 5.526l1.752-1.079a1.917 1.917 0 011.483-.226l3.485.894c.927.237 1.551 1.126 1.478 2.103l-.224 2.983c-.078 1.047-.935 1.869-1.952 1.75C6.392 20.429-1.481 2 3.511 2z"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
        />
      </Svg>
    </Animated.View>
  );
}

export default PhoneIcon;
