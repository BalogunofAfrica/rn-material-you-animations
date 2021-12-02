import React from "react";
import { Text, View } from "react-native";
import { PanGestureHandler } from "react-native-gesture-handler";
import Animated from "react-native-reanimated";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { PhoneIcon } from "../../../assets/icons";
import { useIncomingCallAnimation } from "../../hooks/animation";
import { styles } from "./styles";

function IncomingCall() {
  const edges = useSafeAreaInsets();
  const {
    acceptOpacity,
    declineOpacity,
    gestureContainerStyle,
    gestureHandler,
    headingStyle,
    iconProps,
    repeatTranslateStyle,
    rotationStyle,
    swipeStyle,
  } = useIncomingCallAnimation(
    () => console.log("Accepting call"),
    () => console.log("Rejecting call"),
  );

  return (
    <View style={[styles.container, { paddingTop: edges.top }]}>
      <Animated.View style={headingStyle}>
        <Text style={styles.callingText}>Call from</Text>
        <Text style={styles.titleText}>Tech Support NG</Text>
        <Text style={styles.callingText}>Mobile +234 00 000 000</Text>
      </Animated.View>
      <Animated.View style={[styles.actionsContainer, gestureContainerStyle]}>
        <PanGestureHandler
          activeOffsetY={[0, 0]}
          onGestureEvent={gestureHandler}
        >
          <Animated.View style={[styles.repeatContainer, repeatTranslateStyle]}>
            <Animated.Text style={[styles.acceptText, acceptOpacity]}>
              Swipe up to answer...
            </Animated.Text>
            <Animated.View style={[styles.iconContainer, swipeStyle]}>
              <PhoneIcon
                animatedProps={iconProps}
                rotationStyle={rotationStyle}
              />
            </Animated.View>
          </Animated.View>
        </PanGestureHandler>
        <Animated.Text style={[styles.declineText, declineOpacity]}>
          Swipe down to decline...
        </Animated.Text>
      </Animated.View>
    </View>
  );
}

export default IncomingCall;
