import { useEffect, useRef, useState } from "react";
import {
    Animated,
    Image,
    Pressable,
    StyleSheet,
    Text,
    View,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";

function WelcomeScreen({ onFinish }) {
    const [buttonReady, setButtonReady] = useState(false);
    const logoScale = useRef(new Animated.Value(0.65)).current;
    const logoOpacity = useRef(new Animated.Value(0)).current;
    const titleTranslate = useRef(new Animated.Value(28)).current;
    const titleOpacity = useRef(new Animated.Value(0)).current;
    const buttonScale = useRef(new Animated.Value(0.92)).current;
    const buttonOpacity = useRef(new Animated.Value(0)).current;
    const ringScale = useRef(new Animated.Value(0.8)).current;
    const ringOpacity = useRef(new Animated.Value(0.7)).current;

    useEffect(() => {
        const ringAnimation = Animated.loop(
            Animated.sequence([
                Animated.parallel([
                    Animated.timing(ringScale, {
                        toValue: 1.25,
                        duration: 1200,
                        useNativeDriver: true,
                    }),
                    Animated.timing(ringOpacity, {
                        toValue: 0,
                        duration: 1200,
                        useNativeDriver: true,
                    }),
                ]),
                Animated.parallel([
                    Animated.timing(ringScale, {
                        toValue: 0.8,
                        duration: 0,
                        useNativeDriver: true,
                    }),
                    Animated.timing(ringOpacity, {
                        toValue: 0.7,
                        duration: 0,
                        useNativeDriver: true,
                    }),
                ]),
            ])
        );

        ringAnimation.start();

        Animated.sequence([
            Animated.parallel([
                Animated.spring(logoScale, {
                    toValue: 1,
                    friction: 5,
                    tension: 70,
                    useNativeDriver: true,
                }),
                Animated.timing(logoOpacity, {
                    toValue: 1,
                    duration: 650,
                    useNativeDriver: true,
                }),
            ]),
            Animated.parallel([
                Animated.timing(titleTranslate, {
                    toValue: 0,
                    duration: 500,
                    useNativeDriver: true,
                }),
                Animated.timing(titleOpacity, {
                    toValue: 1,
                    duration: 500,
                    useNativeDriver: true,
                }),
            ]),
            Animated.parallel([
                Animated.spring(buttonScale, {
                    toValue: 1,
                    friction: 6,
                    tension: 80,
                    useNativeDriver: true,
                }),
                Animated.timing(buttonOpacity, {
                    toValue: 1,
                    duration: 450,
                    useNativeDriver: true,
                }),
            ]),
        ]).start(() => setButtonReady(true));

        return () => ringAnimation.stop();
    }, [
        buttonOpacity,
        buttonScale,
        logoOpacity,
        logoScale,
        ringOpacity,
        ringScale,
        titleOpacity,
        titleTranslate,
    ]);

    return (
        <View style={styles.screen}>
            <Animated.View
                style={[
                    styles.glowRing,
                    {
                        opacity: ringOpacity,
                        transform: [{ scale: ringScale }],
                    },
                ]}

            />
            <Animated.View
                style={[
                    styles.copyContainer,
                    {
                        opacity: titleOpacity,
                        transform: [{ translateY: titleTranslate }],
                    },
                ]}
            >
                <Text style={styles.kicker}>Welcome Player</Text>
                <Text style={styles.title}>Guess My Number</Text>
                <Text style={styles.subtitle}>
                    Pick a secret number and let the challenge begin.
                </Text>
            </Animated.View>

            <Animated.View
                style={{
                    opacity: buttonOpacity,
                    transform: [{ scale: buttonScale }],
                }}
            >
                <Pressable
                    onPress={onFinish}
                    disabled={!buttonReady}
                    style={({ pressed }) => [
                        styles.buttonPressable,
                        pressed && styles.buttonPressed,
                    ]}
                    android_ripple={{ color: "#ffffff44" }}
                >
                    <LinearGradient
                        colors={["#ffb800", "#ff005d", "#7c3cff"]}
                        start={{ x: 0, y: 0 }}
                        end={{ x: 1, y: 1 }}
                        style={styles.button}
                    >
                        <Text style={styles.buttonText}>Start Playing</Text>
                    </LinearGradient>
                </Pressable>
            </Animated.View>
        </View>
    );
}

export default WelcomeScreen;

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        padding: 24,
        gap: 28,
    },
    glowRing: {
        position: "absolute",
        width: 230,
        height: 230,
        borderRadius: 115,
        borderWidth: 2,
        borderColor: "#ff7300",
        backgroundColor: "#e07b00",
    },
    logoContainer: {
        width: 190,
        height: 190,
        borderRadius: 95,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#fff8dc",
        borderWidth: 4,
        borderColor: "#ffffff",
        overflow: "hidden",
    },
    logo: {
        width: 140,
        height: 140,
    },
    copyContainer: {
        alignItems: "center",
        gap: 8,
    },
    kicker: {
        color: "#ffdf6c",
        fontSize: 18,
        fontWeight: "700",
        textTransform: "uppercase",
    },
    title: {
        color: "white",
        fontSize: 36,
        fontWeight: "900",
        textAlign: "center",
    },
    subtitle: {
        maxWidth: 290,
        color: "#f7eaff",
        fontSize: 18,
        lineHeight: 25,
        textAlign: "center",
        fontWeight: "600",
    },
    buttonPressable: {
        borderRadius: 32,
        overflow: "hidden",
    },
    button: {
        minWidth: 220,
        alignItems: "center",
        paddingVertical: 15,
        paddingHorizontal: 28,
        borderRadius: 32,
        borderWidth: 2,
        borderColor: "white",
    },
    buttonText: {
        color: "white",
        fontSize: 20,
        fontWeight: "900",
    },
    buttonPressed: {
        opacity: 0.8,
    },
});
