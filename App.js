import { useEffect, useState } from "react";
import {
  ImageBackground,
  LayoutAnimation,
  Platform,
  SafeAreaView,
  StyleSheet,
  UIManager,
} from "react-native";
import StartGameScreen from "./screens/startgamescreen";
import WelcomeScreen from "./screens/welcomescreen";
import { LinearGradient } from "expo-linear-gradient";
import GameScreen from "./screens/gamescreen";
import GameOverScreen from "./screens/gameoverscreen";
import SignInScreen from "./screens/signinscreen";
import SignUpScreen from "./screens/signupscreen";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import { StatusBar } from "expo-status-bar";

SplashScreen.preventAutoHideAsync().catch(() => {});

function animateNextLayoutChange() {
  LayoutAnimation.configureNext(LayoutAnimation.Presets.spring);
}

export default function App() {

  const [fontsLoaded, fontError] = useFonts({
    "open-sans": require("./assets/fonts/OpenSans-Regular.ttf"),
    "open-sans-bold": require("./assets/fonts/OpenSans-Bold.ttf"),
  });
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [authMode, setAuthMode] = useState("signIn");
  const [showWelcome, setShowWelcome] = useState(true);
  const [userNumber, setUserNumber] = useState();
  const [gameIsOver, setGameIsOver] = useState(true);
  const [guessRounds, setGuessRounds] = useState(0);

  useEffect(() => {
    if (Platform.OS === "android" && UIManager.setLayoutAnimationEnabledExperimental) {
      UIManager.setLayoutAnimationEnabledExperimental(true);
    }
  }, []);

  useEffect(() => {
    if (fontsLoaded || fontError) {
      SplashScreen.hideAsync().catch(() => {});
    }
  }, [fontError, fontsLoaded]);

  if (!fontsLoaded && !fontError) {
    return null;
  }

  function finishWelcomeHandler() {
    animateNextLayoutChange();
    setShowWelcome(false);
  }

  function authenticateHandler() {
    animateNextLayoutChange();
    setIsAuthenticated(true);
  }

  function switchAuthModeHandler(mode) {
    animateNextLayoutChange();
    setAuthMode(mode);
  }

  function pickedNumberHandler(pickedNumber) {
    animateNextLayoutChange();
    setUserNumber(pickedNumber);
    setGameIsOver(false);
  }

  function gameOverHandler(numberOfRounds) {
    animateNextLayoutChange();
    setGameIsOver(true);
    setGuessRounds(numberOfRounds);
  }

  function startNewGameHandler() {
    animateNextLayoutChange();
    setUserNumber(null);
    setGuessRounds(0);
    setGameIsOver(true);
  }

  let screen = <StartGameScreen onPickedNumber={pickedNumberHandler} />;

  if (!isAuthenticated && authMode === "signIn") {
    screen = (
      <SignInScreen
        onAuthenticate={authenticateHandler}
        onCreateAccount={() => switchAuthModeHandler("signUp")}
      />
    );
  }

  if (!isAuthenticated && authMode === "signUp") {
    screen = (
      <SignUpScreen
        onAuthenticate={authenticateHandler}
        onSignIn={() => switchAuthModeHandler("signIn")}
      />
    );
  }

  if (isAuthenticated && showWelcome) {
    screen = <WelcomeScreen onFinish={finishWelcomeHandler} />;
  }

  if (isAuthenticated && !showWelcome && userNumber && !gameIsOver) {
    screen = <GameScreen key={userNumber} userNumber={userNumber} onGameOver={gameOverHandler} />;
  }

  if (isAuthenticated && !showWelcome && gameIsOver && userNumber) {
    screen = (
      <GameOverScreen
        userNumber={userNumber}
        roundsNumber={guessRounds}
        onStartNewGame={startNewGameHandler}
      />
    );
  }


  return (
    <LinearGradient
      colors={["#ddb52f", "#310137", "#ff5900"]}
      style={styles.rootScreen}
    >
      <StatusBar style="light" />

      <ImageBackground
        source={require("./assets/images/thunder.png")}
        style={styles.backgroundImage}
        imageStyle={{ opacity: 0.30 }}
      >

        <SafeAreaView style={styles.safeArea}>
          {screen}
        </SafeAreaView>
      </ImageBackground>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  rootScreen: {
    flex: 1,
  },
  backgroundImage: {
    flex: 1,
    resizeMode: "cover",
  },
  safeArea: {
    flex: 1,
  }
});
