import React from "react";
import { View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { Text } from "../../components/Themed";
import { styles } from "./styles";

function NumberPad() {
  const edges = useSafeAreaInsets();
  return (
    <View style={[styles.container, { paddingTop: edges.top }]}>
      <Text>NumberPad</Text>
    </View>
  );
}

export default NumberPad;
