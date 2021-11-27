import * as React from "react";
import Animated from "react-native-reanimated";
import Svg, { Path, PathProps, SvgProps } from "react-native-svg";

const AnimatedPath = Animated.createAnimatedComponent(Path);

interface IconProps extends SvgProps {
  animatedProps?: Partial<Animated.AnimateProps<PathProps>> | undefined;
}

function PhoneIcon(props: IconProps) {
  // return (
  //   <Svg fill="none" height={50} width={50} {...props}>
  //     <AnimatedPath
  //       animatedProps={props.animatedProps}
  //       d="M3.51 2l3.64.132A1.961 1.961 0 018.89 3.37l1.077 2.662c.25.62.183 1.326-.18 1.884l-1.379 2.121c.817 1.173 3.037 3.919 5.388 5.526l1.752-1.079a1.917 1.917 0 011.483-.226l3.485.894c.927.237 1.551 1.126 1.478 2.103l-.224 2.983c-.078 1.047-.935 1.869-1.952 1.75C6.392 20.429-1.481 2 3.511 2z"
  //       stroke="#0f0"
  //       strokeLinecap="round"
  //       strokeLinejoin="round"
  //       strokeWidth={2}
  //     />
  //   </Svg>
  // );
  return (
    <Svg fill="none" height={48} viewBox="-5 -5 48 48" width={48} {...props}>
      <AnimatedPath
        animatedProps={props.animatedProps}
        d="M7.24 15.58c2.88 5.66 7.52 10.28 13.18 13.18l4.4-4.4c.54-.54 1.34-.72 2.04-.48 2.24.74 4.66 1.14 7.14 1.14 1.1 0 2 .9 2 2V34c0 1.1-.9 2-2 2C15.22 36 0 20.78 0 2 0 .9.9 0 2 0h7c1.1 0 2 .9 2 2 0 2.5.4 4.9 1.14 7.14.22.7.06 1.48-.5 2.04l-4.4 4.4z"
        stroke="#0F0"
        strokeWidth={5}
      />
    </Svg>
  );
}

export default PhoneIcon;
