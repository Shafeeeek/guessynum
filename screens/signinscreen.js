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

function SignInScreen({ onAuthenticate, onCreateAccount }) {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [passwordIsVisible, setPasswordIsVisible] = useState(false);

    function submitHandler() {
        const trimmedEmail = email.trim();

        if (!trimmedEmail.includes("@") || password.trim().length < 6) {
            Alert.alert(
                "Check your details",
                "Enter a valid email address and a password with at least 6 characters."
            );
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
                            source={require("../assets/images/login.png")}
                            style={styles.image}
                        />
                    </View>
                    <Text style={styles.kicker}>Welcome back</Text>
                    <Text style={styles.title}>Sign in to play</Text>
                    <Text style={styles.subtitle}>
                        Save your spot and jump straight into the number battle.
                    </Text>
                </View>

                <View style={styles.card}>
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
                                textContentType="password"
                                autoCapitalize="none"
                                autoCorrect={false}
                                onSubmitEditing={submitHandler}
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

                    <Pressable
                        onPress={submitHandler}
                        style={({ pressed }) => [
                            styles.buttonOuter,
                            pressed && styles.pressed,
                        ]}
                        android_ripple={{ color: "#ffffff44" }}
                    >
                        <LinearGradient
                            colors={["#ffb800", "#ff005d", "#7c3cff"]}
                            start={{ x: 0, y: 0 }}
                            end={{ x: 1, y: 1 }}
                            style={styles.button}
                        >
                            <Text style={styles.buttonText}>Sign In</Text>
                        </LinearGradient>
                    </Pressable>

                    <View style={styles.switchRow}>
                        <Text style={styles.switchText}>New player?</Text>
                        <Pressable onPress={onCreateAccount}>
                            <Text style={styles.switchAction}>Create account</Text>
                        </Pressable>
                    </View>
                </View>
            </ScrollView>
        </KeyboardAvoidingView>
    );
}

export default SignInScreen;

const styles = StyleSheet.create({
    keyboardView: {
        flex: 1,
    },
    screen: {
        flexGrow: 1,
        justifyContent: "center",
        padding: 24,
        gap: 24,
    },
    hero: {
        alignItems: "center",
        gap: 8,
    },
    imageContainer: {
        width: 134,
        height: 134,
        borderRadius: 67,
        overflow: "hidden",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#ff950093",
        borderWidth: 3,
        borderColor: "white",
    },
    image: {
        width: 118,
        height: 118,
    },
    kicker: {
        color: "#ffdf6c",
        fontSize: 16,
        fontFamily: "open-sans-bold",
        textTransform: "uppercase",
    },
    title: {
        color: "white",
        fontSize: 34,
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
        gap: 18,
        padding: 20,
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
        minHeight: 52,
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
        minHeight: 52,
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
