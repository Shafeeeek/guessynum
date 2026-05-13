import { View, Text, StyleSheet } from "react-native";
import colors from "../../constants/colors";

function NumberContainer({ children }) {
    return (
        <View style={styles.container}>
            <Text style={styles.number}>{children}</Text>
        </View>
    );
}

export default NumberContainer;

const styles = StyleSheet.create({
    container: {
        borderWidth: 4,
        fontFamily: "open-sans-bold",
        borderColor: colors.primary800,
        padding: 24,
        margin: 24,
        alignItems: "center",
        justifyContent: "center",
    },
    number: {
        fontSize: 36,
        color: colors.primary800,
        fontWeight: "bold",
    },
});
