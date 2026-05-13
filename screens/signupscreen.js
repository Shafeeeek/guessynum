import { useState } from "react";
import {
    Alert,
    Image,
    KeyboardAvoidingView,
    Platform,
    Pressable,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    View,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import colors from "../constants/colors";

function SignUpScreen({ onAuthenticate, onSignIn }) {
    const [playerName, setPlayerName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [passwordIsVisible, setPasswordIsVisible] = useState(false);

    function submitHandler() {
        const trimmedName = playerName.trim();
        const trimmedEmail = email.trim();

        if (trimmedName.length < 2) {
            Alert.alert("Add your name", "Your player name should be at least 2 characters.");
            return;
        }

        if (!trimmedEmail.includes("@")) {
            Alert.alert("Check your email", "Enter a valid email address.");
            return;
        }

        if (password.trim().length < 6) {
            Alert.alert("Create a stronger password", "Use at least 6 characters.");
            return;
        }

        if (password !== confirmPassword) {
            Alert.alert("Passwords do not match", "Re-enter your password confirmation.");
            return;
        }

        onAuthenticate();
    }

    return (
        <KeyboardAvoidingView
            style={styles.keyboardView}
            behavior={Platform.OS === "ios" ? "padding" : undefined}
        >
            <ScrollView
                contentContainerStyle={styles.screen}
                keyboardShouldPersistTaps="handled"
            >
                <View style={styles.hero}>
                    <View style={styles.imageContainer}>
                        <Image
                            source={require("../assets/images/sign.png")}
                            style={styles.image}
                        />
                    </View>
                    <Text style={styles.kicker}>New challenger</Text>
                    <Text style={styles.title}>Create account</Text>
                    <Text style={styles.subtitle}>
                        Set up your player profile before the guessing starts.
                    </Text>
                </View>

                <View style={styles.card}>
                    <View style={styles.fieldGroup}>
                        <Text style={styles.label}>Player name</Text>
                        <TextInput
                            style={styles.input}
                            value={playerName}
                            onChangeText={setPlayerName}
                            placeholder="Your game name"
                            placeholderTextColor="#f7eaff99"
                            autoCorrect={false}
                            textContentType="name"
                        />
                    </View>

                    <View style={styles.fieldGroup}>
                        <Text style={styles.label}>Email</Text>
                        <TextInput
                            style={styles.input}
                            value={email}
                            onChangeText={setEmail}
                            placeholder="player@email.com"
                            placeholderTextColor="#f7eaff99"
                            keyboardType="email-address"
                            autoCapitalize="none"
                            autoCorrect={false}
                            textContentType="emailAddress"
                        />
                    </View>

                    <View style={styles.fieldGroup}>
                        <Text style={styles.label}>Password</Text>
                        <View style={styles.passwordRow}>
                            <TextInput
                                style={styles.passwordInput}
                                value={password}
                                onChangeText={setPassword}
                                placeholder="6+ characters"
                                placeholderTextColor="#f7eaff99"
                                secureTextEntry={!passwordIsVisible}
                                textContentType="newPassword"
                                autoCapitalize="none"
                                autoCorrect={false}
                            />
                            <Pressable
                                onPress={() => setPasswordIsVisible((current) => !current)}
                                style={({ pressed }) => [
                                    styles.visibilityButton,
                                    pressed && styles.pressed,
                                ]}
                            >
                                <Text style={styles.visibilityText}>
                                    {passwordIsVisible ? "Hide" : "Show"}
                                </Text>
                            </Pressable>
                        </View>
                    </View>

                    <View style={styles.fieldGroup}>
                        <Text style={styles.label}>Confirm password</Text>
                        <TextInput
                            style={styles.input}
                            value={confirmPassword}
                            onChangeText={setConfirmPassword}
                            placeholder="Repeat password"
                            placeholderTextColor="#f7eaff99"
                            secureTextEntry={!passwordIsVisible}
                            textContentType="newPassword"
                            autoCapitalize="none"
                            autoCorrect={false}
                            onSubmitEditing={submitHandler}
                        />
                    </View>

                    <Pressable
                        onPress={submitHandler}
                        style={({ pressed }) => [
                            styles.buttonOuter,
                            pressed && styles.pressed,
                        ]}
                        android_ripple={{ color: "#ffffff44" }}
                    >
                        <LinearGradient
                            colors={["#38ff6b", "#00c2ff", "#7c3cff"]}
                            start={{ x: 0, y: 0 }}
                            end={{ x: 1, y: 1 }}
                            style={styles.button}
                        >
                            <Text style={styles.buttonText}>Create Account</Text>
                        </LinearGradient>
                    </Pressable>

                    <View style={styles.switchRow}>
                        <Text style={styles.switchText}>Already have an account?</Text>
                        <Pressable onPress={onSignIn}>
                            <Text style={styles.switchAction}>Sign in</Text>
                        </Pressable>
                    </View>
                </View>
            </ScrollView>
        </KeyboardAvoidingView>
    );
}

export default SignUpScreen;

const styles = StyleSheet.create({
    keyboardView: {
        flex: 1,
    },
    screen: {
        flexGrow: 1,
        justifyContent: "center",
        padding: 24,
        gap: 20,
    },
    hero: {
        alignItems: "center",
        gap: 8,
    },
    imageContainer: {
        width: 130,
        height: 130,
        borderRadius: 59,
        overflow: "hidden",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#ffa200d3",
        borderWidth: 3,
        borderColor: "white",
    },
    image: {
        width: 100,
        height: 100,
    },
    kicker: {
        color: "#ffdf6c",
        fontSize: 15,
        fontFamily: "open-sans-bold",
        textTransform: "uppercase",
    },
    title: {
        color: "white",
        fontSize: 32,
        fontFamily: "open-sans-bold",
        textAlign: "center",
    },
    subtitle: {
        maxWidth: 300,
        color: "#f7eaff",
        fontSize: 16,
        lineHeight: 23,
        fontFamily: "open-sans",
        textAlign: "center",
    },
    card: {
        width: "100%",
        maxWidth: 420,
        alignSelf: "center",
        gap: 15,
        padding: 18,
        borderRadius: 18,
        backgroundColor: "#190024dd",
        borderWidth: 1,
        borderColor: "#ffffff33",
    },
    fieldGroup: {
        gap: 8,
    },
    label: {
        color: "#ffdf6c",
        fontSize: 15,
        fontFamily: "open-sans-bold",
    },
    input: {
        minHeight: 50,
        borderRadius: 14,
        borderWidth: 1,
        borderColor: "#ffffff33",
        backgroundColor: "#ffffff18",
        color: "white",
        paddingHorizontal: 16,
        fontSize: 16,
        fontFamily: "open-sans",
    },
    passwordRow: {
        minHeight: 50,
        flexDirection: "row",
        alignItems: "center",
        borderRadius: 14,
        borderWidth: 1,
        borderColor: "#ffffff33",
        backgroundColor: "#ffffff18",
        overflow: "hidden",
    },
    passwordInput: {
        flex: 1,
        color: "white",
        paddingHorizontal: 16,
        fontSize: 16,
        fontFamily: "open-sans",
    },
    visibilityButton: {
        alignSelf: "stretch",
        justifyContent: "center",
        paddingHorizontal: 14,
    },
    visibilityText: {
        color: colors.primary800,
        fontSize: 14,
        fontFamily: "open-sans-bold",
    },
    buttonOuter: {
        borderRadius: 30,
        overflow: "hidden",
    },
    button: {
        minHeight: 54,
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 30,
        borderWidth: 2,
        borderColor: "white",
    },
    buttonText: {
        color: "white",
        fontSize: 19,
        fontFamily: "open-sans-bold",
    },
    switchRow: {
        flexDirection: "row",
        justifyContent: "center",
        flexWrap: "wrap",
        gap: 6,
    },
    switchText: {
        color: "#f7eaff",
        fontSize: 15,
        fontFamily: "open-sans",
    },
    switchAction: {
        color: colors.primary800,
        fontSize: 15,
        fontFamily: "open-sans-bold",
    },
    pressed: {
        opacity: 0.78,
    },
});
