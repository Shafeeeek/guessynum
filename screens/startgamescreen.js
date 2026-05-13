import { TextInput, View, StyleSheet, Alert, Text, Image, Animated } from "react-native";
import { useEffect, useRef, useState } from "react";
import PrimaryButton from "../components/ui/primarybuttons";
import colors from "../constants/colors";
import Card from "../components/ui/card";

function StartGameScreen({ onPickedNumber }) {
    const [enteredNumber, setEnteredNumber] = useState("");

    function numberInputHandler(enteredText) {
        setEnteredNumber(enteredText);
    }

    function confirmInputHandler() {
        const chosenNumber = parseInt(enteredNumber);

        if (isNaN(chosenNumber) || chosenNumber <= 0 || chosenNumber > 99) {
            Alert.alert("Invalid Number!", "Number has to be a number between 1 and 99.",
                [{ style: "cancel", onPress: () => setEnteredNumber("") }]);
            return;
        }


        onPickedNumber(chosenNumber);

    }

    function resetInputHandler() {
        setEnteredNumber("");
    }
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

        <>
            <View style={styles.ImageContainer}>
                <Image source={require("../assets/images/guess.png")} style={styles.image} />
            </View>
            <Card style={styles.inputContainer}>
                <Animated.View
                    style={[
                        styles.glowRing,
                        {
                            opacity: ringOpacity,
                            transform: [{ scale: ringScale }],
                        },
                    ]}
                />
                <View>
                    <Text style={styles.number}>Guess My Number</Text>
                </View>
                <View >
                    <Text style={styles.number}>Entered Number</Text>
                </View>
                <TextInput
                    style={styles.numberInput}
                    maxLength={2}
                    keyboardType="number-pad"
                    autoCapitalize="none"
                    autoCorrect={false}
                    onChangeText={numberInputHandler}
                    value={enteredNumber} />
                <View style={styles.buttonscontainer}>
                    <PrimaryButton onPress={resetInputHandler}>
                        <Image source={require("../assets/images/reset.png")} style={{ width: 20, height: 20 }} />
                    </PrimaryButton>
                    <PrimaryButton onPress={confirmInputHandler}>
                        <Image source={require("../assets/images/check-mail.png")} style={{ width: 20, height: 20 }} />
                    </PrimaryButton>
                </View>

            </Card>
        </>
    );
}

export default StartGameScreen;

const styles = StyleSheet.create({
    inputContainer: {
        backgroundColor: colors.primary500,
        borderRadius: 8,
        shadowColor: "black",
        shadowOffset: { width: 0, height: 5 },
        shadowRadius: 15,
        shadowOpacity: 1,
        alignItems: "center",
    },
    glowRing: {
        position: "absolute",
        width: 180,
        height: 180,
        borderRadius: 90,
        borderWidth: 2,
        borderColor: "#ffdf6c",
        backgroundColor: "#ffffff18",
    },
    numberInput: {
        height: 40,
        fontSize: 32,
        borderBottomColor: colors.primary700,
        borderBottomWidth: 2,
        color: colors.primary500,
        marginVertical: 8,
        fontWeight: "bold",
        textAlign: "center",
        width: 50,
        color: "white",
    },
    buttonscontainer: {
        flexDirection: "row",
        margin: 10,
    },
    number: {
        color: "white",
        fontSize: 24,
        fontWeight: "bold",
        color: "#00ffdd",
    },
    ImageContainer: {
        backgroundColor: "#00000",
        justifyContent: "center",
        alignItems: "center",
        alignSelf: "center",
        borderRadius: 20,
        marginVertical: 30,
        shadowColor: "black",
        shadowOffset: { width: 0, height: 5 },
        shadowRadius: 15,
        borderWidth: 3,
        borderColor: "green"
    },
    image: {
        width: 200,
        height: 200,
    },
});
