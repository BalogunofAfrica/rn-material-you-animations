import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 16,
    marginVertical: 8,
    borderRadius: 8,
    flex: 1,
    height: 150,
    overflow: "hidden",
  },
  image: {
    borderRadius: 8,
    width: undefined,
    height: 150,
    resizeMode: "contain",
  },
  content: {
    ...StyleSheet.absoluteFillObject,
    padding: 8,
    justifyContent: "flex-end",
  },
});

export { styles };
