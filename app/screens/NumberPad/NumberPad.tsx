import React from "react";
import { FlatList, StyleSheet, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import Ripple from "./Ripple";

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    backgroundColor: "#fff",
    flex: 1,
    justifyContent: "center",
  },
  ripple: {
    alignItems: "center",
    backgroundColor: "white",
    elevation: 5,
    height: 100,
    justifyContent: "center",
    width: 100,
  },
});

function NumberPad() {
  const edges = useSafeAreaInsets();
  return (
    <View style={[styles.container, { paddingTop: edges.top }]}>
      <FlatList
        contentContainerStyle={{ justifyContent: "space-between" }}
        data={Array(12).fill(0)}
        keyExtractor={(item, index) => `${item}-${index}`}
        numColumns={3}
        renderItem={({ index }) => (
          <Ripple
            onPress={() => console.log("Pressed", index + 1)}
            style={styles.ripple}
          >
            <Text style={{ fontSize: 48, fontWeight: "bold" }}>
              {index + 1}
            </Text>
          </Ripple>
        )}
      />
    </View>
  );
}

export default NumberPad;
