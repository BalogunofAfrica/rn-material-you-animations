import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  acceptText: {
    color: "#7B7C81",
    fontStyle: "italic",
    marginBottom: 12,
  },
  actionsContainer: {
    alignItems: "center",
    paddingBottom: 40,
  },
  callingText: {
    color: "#fff",
    fontSize: 20,
    marginBottom: 8,
    textAlign: "center",
  },
  container: {
    alignItems: "center",
    backgroundColor: "#222328",
    flex: 1,
    justifyContent: "space-between",
    padding: 8,
  },
  declineText: {
    color: "#7B7C81",
    fontStyle: "italic",
    marginTop: 12,
  },
  iconContainer: {
    alignItems: "center",
    borderRadius: 40,
    height: 80,
    justifyContent: "center",
    width: 80,
  },
  repeatContainer: {
    alignItems: "center",
  },
  titleText: {
    color: "#fff",
    fontSize: 36,
    fontWeight: "800",
    marginBottom: 8,
    textAlign: "center",
  },
});

export { styles };
