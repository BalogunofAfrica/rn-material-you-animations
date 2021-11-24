import * as React from "react";
import { View } from "react-native";
import { RectButton } from "react-native-gesture-handler";

import { Text } from "../../components/Themed";
import { styles } from "./styles";

interface Props {
  title: string;
  onPress: () => void;
}

export default function ExampleBlock({ title, onPress }: Props) {
  return (
    <RectButton onPress={onPress}>
      <View style={styles.container}>
        <View style={styles.content}>
          <Text>{title}</Text>
        </View>
      </View>
    </RectButton>
  );
}
