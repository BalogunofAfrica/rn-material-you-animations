import React, { useEffect } from "react";
import { Text, Vibration, View } from "react-native";
import { PanGestureHandler } from "react-native-gesture-handler";
import Animated from "react-native-reanimated";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { PhoneIcon } from "../../../assets/icons";
import { useIncomingCallAnimation } from "../../hooks/animation";
import { styles } from "./styles";

function IncomingCall() {
  const {
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
  } = useIncomingCallAnimation(
    () => console.log("Join"),
    () => console.log("Hang up"),
  );
  const edges = useSafeAreaInsets();

  useEffect(() => {
    // Vibration settings
    const ONE_SECOND_IN_MS = 1000;
    // Setting the pattern of vibration
    const PATTERN = [
      1 * ONE_SECOND_IN_MS,
      2 * ONE_SECOND_IN_MS,
      3 * ONE_SECOND_IN_MS,
    ];
    // Vibration.vibrate(PATTERN, true);
    return () => {
      // release resources
      Vibration.cancel();
    };
  }, []);

  return (
    <View style={[styles.wrapper, { paddingTop: edges.top }]}>
      <View style={styles.container}>
        <Animated.View style={titleStyle}>
          <Text style={styles.callingText}>Call from</Text>
          <Text
            style={[styles.callingText, { fontSize: 36, fontWeight: "800" }]}
          >
            Tech Support NG
          </Text>
          <Text style={styles.callingText}>Mobile +234 00 000 000</Text>
        </Animated.View>
        <Animated.View style={[styles.actionsContainer, gestureContainerStyle]}>
          <PanGestureHandler
            activeOffsetY={[0, 0]}
            onGestureEvent={gestureHandler}
          >
            <Animated.View
              style={[styles.repeatContainer, repeatTranslateStyle]}
            >
              <Animated.View style={acceptStyle}>
                <Text style={styles.acceptText}>Swipe up to answer...</Text>
              </Animated.View>
              <Animated.View style={swipeStyle}>
                <Animated.View
                  style={[styles.iconContainer, iconContainerStyle]}
                >
                  <Animated.View style={rotationStyle}>
                    <PhoneIcon
                      animatedProps={iconProps}
                      height={24}
                      width={24}
                    />
                  </Animated.View>
                </Animated.View>
              </Animated.View>
            </Animated.View>
          </PanGestureHandler>

          <Animated.View style={[declineStyle]}>
            <Animated.View style={[declineOpacity]}>
              <Text style={styles.declineText}>Swipe down to decline...</Text>
            </Animated.View>
          </Animated.View>
        </Animated.View>
      </View>
    </View>
  );
}

export default IncomingCall;
