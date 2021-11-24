import React from "react";
import { ScrollView, StyleSheet } from "react-native";

import { RootStackScreenProps } from "../../../types";
import { examples } from "./constants";
import ExampleBlock from "./ExampleBlock";

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
  },
  content: {
    paddingVertical: 8,
    flex: 1,
  },
});

const Examples = ({ navigation }: RootStackScreenProps<"Examples">) => {
  return (
    <ScrollView style={styles.content}>
      {examples.map((item) => (
        <ExampleBlock
          key={item.screen}
          onPress={() => navigation.navigate(item.screen)}
          title={item.title}
        />
      ))}
    </ScrollView>
  );
};

export default Examples;
