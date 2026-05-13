import { Text, StyleSheet } from "react-native";

function title({children}) {
        return <Text style={styles.title}> {children} </Text>;
            
    
}

export default title;

const styles = StyleSheet.create({
    title: {
        fontFamily: "open-sans-bold",
        fontSize: 24,
        fontWeight: "bold",
        color: "yellow",
        textAlign: "center",
        borderWidth: 5,
        borderColor: "#9e0045",
        padding: 12,
        marginTop: 60,
        paddingHorizontal: 30,
    },
});