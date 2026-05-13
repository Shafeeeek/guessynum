import { StyleSheet, View } from "react-native";
import colors from "../../constants/colors";

function Card({ children, style }) {
    return <View style={[styles.card, style]}>{children}</View>;
}

export default Card;

const styles = StyleSheet.create({
    card: {
        marginTop: 100,
        padding: 16,
        backgroundColor: colors.primary500,
        borderRadius: 8,
        elevation: 4,
        shadowColor: "black",
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 8,
        marginHorizontal: 30,
        shadowOpacity: 0.25,
        alignItems: "center",
    }
});
