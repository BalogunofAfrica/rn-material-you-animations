import * as React from "react";
import { View } from "react-native";
import { RectButton } from "react-native-gesture-handler";
import Animated from "react-native-reanimated";

import { Text } from "../../components/Themed";
import { blockStyles as styles } from "./styles";

interface Props {
  onPress: () => void;
  source: number;
  title: string;
}

function ExampleBlock({ onPress, source, title }: Props) {
  return (
    <RectButton activeOpacity={0.7} onPress={onPress} rippleColor="#D5E3FE">
      <View style={styles.container}>
        <Animated.Image source={source} style={styles.image} />
        <View style={styles.content}>
          <Text style={styles.title}>{title}</Text>
        </View>
      </View>
    </RectButton>
  );
}

export default ExampleBlock;
