import React from "react";
import { ScrollView } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { RootStackScreenProps } from "../../../types";
import { Text } from "../../components/Themed";
import { examples } from "./constants";
import ExampleBlock from "./ExampleBlock";
import { styles } from "./styles";

function Examples({ navigation }: RootStackScreenProps<"Examples">) {
  const insets = useSafeAreaInsets();
  return (
    <ScrollView style={[styles.container, { paddingTop: insets.top }]}>
      <Text style={styles.heading}>Examples</Text>
      <Text style={styles.subHeading}>Click an example to continue</Text>

      {examples.map((item) => (
        <ExampleBlock
          key={item.screen}
          onPress={() => navigation.navigate(item.screen)}
          source={item.source}
          title={item.title}
        />
      ))}
    </ScrollView>
  );
}

export default Examples;
