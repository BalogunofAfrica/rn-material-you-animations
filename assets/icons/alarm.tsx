import * as React from "react";
import Animated from "react-native-reanimated";
import Svg, {
  Circle,
  Polyline,
  SvgProps,
  CircleProps,
  Path,
  PolylineProps,
} from "react-native-svg";

const AnimatedCircle = Animated.createAnimatedComponent(Circle);
const AnimatedPath = Animated.createAnimatedComponent(Path);
const AnimatedPolyLine = Animated.createAnimatedComponent(Polyline);

interface IconProps extends SvgProps {
  circleAnimatedProps?: Partial<Animated.AnimateProps<CircleProps>> | undefined;
  pathAnimatedProps?: Partial<Animated.AnimateProps<CircleProps>> | undefined;
  polyLineAnimatedProps?: Partial<Animated.AnimateProps<PolylineProps>>;
}

function AlarmIcon(props: IconProps) {
  return (
    <Svg
      width={30}
      height={30}
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <AnimatedPath
        animatedProps={props.pathAnimatedProps}
        stroke="#000"
        d="M10 3L5 7M20 3l5 4"
      />
      <AnimatedCircle
        animatedProps={props.circleAnimatedProps}
        stroke="#000"
        cx={15}
        cy={15}
        r={10}
      />
      <AnimatedPolyLine
        animatedProps={props.polyLineAnimatedProps}
        stroke="#000"
      />
    </Svg>
  );
}

export default AlarmIcon;
