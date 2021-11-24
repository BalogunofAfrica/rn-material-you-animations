import React from "react";
import { View } from "react-native";
import Animated from "react-native-reanimated";

import { useTranslatorAnimation } from "../../hooks/animation";
import { translatorStyles as styles } from "./styles";

interface TranslatorProps {
  translateX: Animated.SharedValue<number>;
}
export default function Translator({ translateX }: TranslatorProps) {
  const { widthstyle, widthstyle2 } = useTranslatorAnimation(translateX);

  return (
    <View style={styles.container}>
      <View style={styles.rtl}>
        <Animated.View style={[styles.item, widthstyle]} />
      </View>
      <View style={styles.ltr}>
        <Animated.View style={[styles.item, widthstyle2]} />
      </View>
    </View>
  );
}
