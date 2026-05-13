import { Alert, Text, View, StyleSheet } from "react-native";
import Title from "../components/ui/title";
import colors from "../constants/colors";
import { useState, useEffect, useRef } from "react";
import NumberContainer from "../components/game/numbercontaine";
import PrimaryButton from "../components/ui/primarybuttons";
import Card from "../components/ui/card";

function getRandomNumber(min, max, exclude) {
    const possibleNumbers = [];

    for (let i = min; i < max; i++) {
        if (i !== exclude) {
            possibleNumbers.push(i);
        }
    }

    if (possibleNumbers.length === 0) {
        return exclude;
    }

    const randomIndex = Math.floor(Math.random() * possibleNumbers.length);
    return possibleNumbers[randomIndex];
}

function GameScreen({ userNumber, onGameOver }) {
    const minBoundary = useRef(1);
    const maxBoundary = useRef(100);

    const [currentGuess, setCurrentGuess] = useState(() => getRandomNumber(1, 100, userNumber));
    const [guessRounds, setGuessRounds] = useState([currentGuess]);

    useEffect(() => {
        if (currentGuess === userNumber) {
            onGameOver(guessRounds.length);
        }
    }, [currentGuess, userNumber, onGameOver, guessRounds.length]);

    function nextGuessHandler(direction) {
        let newRndNumber;

        if ((direction === "lower" && currentGuess < userNumber) || (direction === "higher" && currentGuess > userNumber)) {
            Alert.alert("Don't lie!", "You know that this is wrong...", [{ text: "Sorry!", style: "cancel" }
            ]);
            return;

        }

        if (direction === "lower") {
            maxBoundary.current = currentGuess;
            newRndNumber = getRandomNumber(minBoundary.current, maxBoundary.current, currentGuess);
        } else {
            minBoundary.current = currentGuess + 1;
            newRndNumber = getRandomNumber(minBoundary.current, maxBoundary.current, currentGuess);
        }
        setCurrentGuess(newRndNumber);
        setGuessRounds((prevGuessRounds) => [newRndNumber, ...prevGuessRounds]);
    }

    return (
        <View style={styles.screen}>
            <Title>Opponent's guess:</Title>
            <NumberContainer>{currentGuess}</NumberContainer>
            <Card>
                <Text style={styles.text}>{currentGuess}</Text>
                <View style={styles.buttonscontainer}>
                    <PrimaryButton onPress={() => nextGuessHandler("higher")}>
                        +
                        
                    </PrimaryButton>
                    <PrimaryButton onPress={() => nextGuessHandler("lower")}>
                        -
                
                    </PrimaryButton>
                </View>
            </Card>
        </View >
    );
}

export default GameScreen;


const styles = StyleSheet.create({
    screen: {
        flex: 1,
        color: "white",
        textAlign: "center",
        alignItems: "center",
        padding: 24,
    },
    text: {
        borderColor: colors.primary500,
        padding: 12,
        fontSize: 24,
        fontWeight: "bold",
        color: "white",
        paddingHorizontal: 30,
    },
    text2: {
        borderWidth: 5,
        borderColor: colors.primary500,
        padding: 12,
        marginTop: 24,
        fontSize: 24,
        fontWeight: "bold",
        color: "white",
        paddingHorizontal: 30,
    },
    buttonscontainer: {
        flexDirection: "row",
        marginTop: 24,
    },

});
