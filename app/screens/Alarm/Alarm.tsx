import React from "react";
import { View } from "react-native";
import { PanGestureHandler } from "react-native-gesture-handler";
import Animated from "react-native-reanimated";

import { AlarmIcon } from "../../../assets/icons";
import { AnimatedText, Text } from "../../components/Themed";
import { useAlarmAnimation } from "../../hooks/animation";
import { styles } from "./styles";
import Translator from "./Translator";

function AlarmClock() {
  const {
    actionStyle,
    actionStyle2,
    circleOpacity,
    gestureHandler,
    pathOpacity,
    polyLinePath,
    rotateStyle,
    swipeStyle,
    translateX,
  } = useAlarmAnimation();

  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.time}>10:55</Text>
        <Text style={styles.title}>Alarm</Text>
      </View>
      <View>
        <View style={styles.bottomContainer}>
          <Translator translateX={translateX} />
          <AnimatedText animatedStyle={actionStyle2} style={styles.snoozeText}>
            Snooze
          </AnimatedText>
          <PanGestureHandler
            activeOffsetY={[0, 0]}
            onGestureEvent={gestureHandler}
          >
            <Animated.View style={[styles.gestureContainer, swipeStyle]}>
              <Animated.View style={rotateStyle}>
                <AlarmIcon
                  circleAnimatedProps={circleOpacity}
                  pathAnimatedProps={pathOpacity}
                  polyLineAnimatedProps={polyLinePath}
                />
              </Animated.View>
            </Animated.View>
          </PanGestureHandler>
          <AnimatedText animatedStyle={actionStyle} style={styles.stopText}>
            Stop
          </AnimatedText>
        </View>
      </View>
    </View>
  );
}

export default AlarmClock;
