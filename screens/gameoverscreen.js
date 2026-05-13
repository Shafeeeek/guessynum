import { useEffect, useRef } from "react";
import { Animated, View, Text, StyleSheet, Image, Pressable } from "react-native";
import { LinearGradient } from "expo-linear-gradient";

function GameOverScreen({ userNumber, roundsNumber, onStartNewGame }) {
    const ringScale = useRef(new Animated.Value(0.85)).current;
    const ringOpacity = useRef(new Animated.Value(0.75)).current;

    useEffect(() => {
        const ringAnimation = Animated.loop(
            Animated.sequence([
                Animated.parallel([
                    Animated.timing(ringScale, {
                        toValue: 4.5,
                        duration: 1400,
                        useNativeDriver: true,
                    }),
                    Animated.timing(ringOpacity, {
                        toValue: 0,
                        duration: 1400,
                        useNativeDriver: true,
                    }),
                ]),
                Animated.parallel([
                    Animated.timing(ringScale, {
                        toValue: 0.85,
                        duration: 0,
                        useNativeDriver: true,
                    }),
                    Animated.timing(ringOpacity, {
                        toValue: 0.75,
                        duration: 0,
                        useNativeDriver: true,
                    }),
                ]),
            ])
        );

        ringAnimation.start();

        return () => ringAnimation.stop();
    }, [ringOpacity, ringScale]);

    return (
        <View style={styles.screen}>
            <View style={styles.imageStage}>
                <Animated.View
                    style={[
                        styles.glowRing,
                        {
                            opacity: ringOpacity,
                            transform: [{ scale: ringScale }],
                        },
                    ]}
                />
                <View style={styles.imageContainer}>
                    <Image source={require("../assets/images/gameover.png")} style={styles.image} />
                </View>
            </View>
            <View>
                <Text style={styles.text}>Number of rounds: {roundsNumber}</Text>
                <Text style={styles.text}>Number was: {userNumber}</Text>
            </View>
            <View style={styles.buttonscontainer}>
                <View style={styles.buttonShadow}>
                    <Pressable
                        onPress={onStartNewGame}
                        style={({ pressed }) => [
                            styles.buttonPressable,
                            pressed && styles.pressed,
                        ]}
                        android_ripple={{ color: "#ffffff55" }}
                    >
                        <LinearGradient
                            colors={["#ff005d", "#ffb800", "#38ff6b", "#00c2ff", "#7c3cff"]}
                            start={{ x: 0, y: 0 }}
                            end={{ x: 1, y: 1 }}
                            style={styles.gradientButton}
                        >
                            <Text style={styles.text2}>Start New Game</Text>
                        </LinearGradient>
                    </Pressable>
                </View>
                <View>
                </View>
            </View>
        </View>

    );
}



export default GameOverScreen;

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        alignItems: "center",
    },
    imageStage: {
        width: 330,
        height: 330,
        alignItems: "center",
        justifyContent: "center",
        marginVertical: 70,
    },
    glowRing: {
        position: "absolute",
        width: 320,
        height: 320,
        borderRadius: 160,
        borderWidth: 4,
        borderColor: "#ffdf6c",
        backgroundColor: "#ffffff18",
    },
    text: {
        fontSize: 20,
        fontWeight: "bold",
        textAlign: "center",
        color: "yellow",
    },
    text2: {
        fontSize: 20,
        fontWeight: "bold",
        textAlign: "center",
        color: "white",
    },
    buttonscontainer: {
        flexDirection: "row",
        marginTop: 24,
        fontSize: 20,
    },
    buttonShadow: {
        borderRadius: 30,
        elevation: 5,
        shadowColor: "black",
        shadowOffset: { width: 0, height: 3 },
        shadowRadius: 6,
        shadowOpacity: 0.35,
    },
    buttonPressable: {
        borderRadius: 30,
        overflow: "hidden",
    },
    gradientButton: {
        minWidth: 220,
        paddingVertical: 14,
        paddingHorizontal: 28,
        borderRadius: 30,
        borderWidth: 2,
        borderColor: "white",
    },
    pressed: {
        opacity: 0.75,
    },
    imageContainer: {
        width: 300,
        height: 300,
        borderRadius: 150,
        borderWidth: 3,
        borderColor: "white",
        overflow: "hidden",
        backgroundColor: "white",
    },
    image: {
        width: 300,
        height: 300,
        marginBottom: 5,
    }
});
