import { Dimensions, StyleSheet } from "react-native";

const { height } = Dimensions.get("window");
const lineHeight = 120;
const itemWidth = 100;

const styles = StyleSheet.create({
  bottomContainer: {
    alignItems: "center",
    backgroundColor: "#292C35",
    borderRadius: 45,
    flexDirection: "row",
    height: 85,
    paddingHorizontal: 16,
    paddingVertical: 8,
    width: "100%",
  },
  container: {
    alignItems: "center",
    backgroundColor: "#1B1B1D",
    flex: 1,
    justifyContent: "space-between",
    paddingBottom: 30,
    paddingHorizontal: 13,
    paddingTop: height / 2 - lineHeight / 4,
  },
  gestureContainer: {
    alignItems: "center",
    backgroundColor: "#D5E3FE",
    borderRadius: 35,
    flex: 1,
    height: "100%",
    justifyContent: "center",
    width: itemWidth,
  },
  snoozeText: {
    color: "#fff",
    flex: 1,
    fontSize: 20,
  },
  stopText: {
    color: "#fff",
    flex: 1,
    fontSize: 20,
    textAlign: "right",
  },
  time: {
    color: "#fff",
    fontSize: lineHeight,
    fontWeight: "900",
    letterSpacing: 12,
    lineHeight,
  },
  title: {
    color: "#fff",
    fontSize: 24,
    textAlign: "center",
  },
});

const translatorStyles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    flexDirection: "row",
    padding: 8,
  },
  item: {
    backgroundColor: "#535965",
    height: "100%",
  },
  ltr: {
    flex: 1,
    height: "100%",
  },
  rtl: {
    flex: 1,
    flexDirection: "row-reverse",
    height: "100%",
  },
});

export { styles, translatorStyles };
