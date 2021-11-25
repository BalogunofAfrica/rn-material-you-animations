import { StyleSheet } from "react-native";

const blockStyles = StyleSheet.create({
  container: {
    borderRadius: 8,
    flex: 1,
    height: 150,
    marginHorizontal: 16,
    marginVertical: 8,
    overflow: "hidden",
  },
  content: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: "flex-end",
    padding: 8,
  },
  image: {
    borderRadius: 8,
    height: 150,
    resizeMode: "contain",
    width: undefined,
  },
  title: {
    fontSize: 20,
    fontWeight: "700",
  },
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: 8,
  },
  heading: {
    fontSize: 20,
    fontWeight: "700",
    margin: 16,
    marginBottom: 0,
    textAlign: "justify",
  },
  subHeading: {
    margin: 16,
  },
});

export { blockStyles, styles };
