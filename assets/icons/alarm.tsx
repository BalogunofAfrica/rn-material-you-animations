import * as React from "react";
import Animated from "react-native-reanimated";
import Svg, {
  Circle,
  CircleProps,
  Path,
  Polyline,
  PolylineProps,
  SvgProps,
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
      fill="none"
      height={30}
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      width={30}
      {...props}
    >
      <AnimatedPath
        animatedProps={props.pathAnimatedProps}
        d="M10 3L5 7M20 3l5 4"
        stroke="#000"
      />
      <AnimatedCircle
        animatedProps={props.circleAnimatedProps}
        cx={15}
        cy={15}
        r={10}
        stroke="#000"
      />
      <AnimatedPolyLine
        animatedProps={props.polyLineAnimatedProps}
        stroke="#000"
      />
    </Svg>
  );
}

export default AlarmIcon;
