
import React, { useState } from "react";
import { View, Text, TextInput, Button, StyleSheet, Alert } from "react-native";
import { useAuth } from "../hooks/useAuth";
import { useSelector } from "react-redux";
import { RootState } from "../store";

const LoginScreen: React.FC<{ navigation: any }> = ({ navigation }) => {
    const [email, setEmail] = useState("emilys");
    const [password, setPassword] = useState("emilyspass");
    const { login } = useAuth();
    const authLoading = useSelector((s: RootState) => s.auth.loading);

    const onLogin = async () => {
        const res = await login(email, password);
        if (res.ok) {
            navigation.replace("Home");
        } else {
            Alert.alert("Login failed", res.message ?? "Please try again");
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Welcome back</Text>
            <TextInput value={email} onChangeText={setEmail} style={styles.input} keyboardType="email-address" />
            <TextInput value={password} onChangeText={setPassword} style={styles.input} secureTextEntry />
            <Button title={authLoading ? "Signing in..." : "Sign In"} onPress={onLogin} disabled={authLoading} />
        </View>
    );
};

export default LoginScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        justifyContent: "center"
    },
    title: {
        fontSize: 28,
        fontWeight: "700",
        marginBottom: 20
    },
    input: {
        height: 48,
        backgroundColor: "#f3f4f6",
        marginBottom: 12,
        borderRadius: 8,
        paddingHorizontal: 12,
    },
});
