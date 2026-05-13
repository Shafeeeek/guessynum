import { Text, View, Pressable, StyleSheet } from "react-native";

function PrimaryButton({ children, onPress }) {
  return (
    <View style={styles.buttonouter}>
      <Pressable
        style={({ pressed }) =>
          pressed ? [styles.buttoninner, styles.pressed] : styles.buttoninner
        }
        onPress={onPress}
        android_ripple={{ color: "#ffe204" }}
      >
        <Text style={[styles.buttonText]}>{children}</Text>
      </Pressable>
    </View>
  );
}

export default PrimaryButton;

const styles = StyleSheet.create({
  buttonouter: {
    borderRadius: 28,
    margin: 4,
    overflow: "hidden",
    padding: 5,
    margin: 8,
  },
  buttoninner: {
    backgroundColor: "#000000",
    paddingVertical: 10,
    paddingHorizontal: 16,
    elevation: 2,
    shadowColor: "black",
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    shadowOpacity: 0.25,
    borderRadius: 28,
  },
  buttonText: {
    color: "white",
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
  },
  pressed: {
    opacity: 0.75,
  },
});
