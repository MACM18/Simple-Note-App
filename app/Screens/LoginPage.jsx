// screens/LoginPage.js
import React, { useContext, useState } from "react";
import { View, TextInput, Button, Text, StyleSheet } from "react-native";
import { AuthContext } from "../context/AuthContext";

const LoginPage = ({ navigation }) => {
  const { login } = useContext(AuthContext);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = () => {
    if (username && password) {
      login(username);
      navigation.navigate("Home");
    } else {
      setError("Please fill in all fields");
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        placeholder='Username'
        value={username}
        onChangeText={setUsername}
        style={styles.input}
      />
      <TextInput
        placeholder='Password'
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        style={styles.input}
      />
      {error ? <Text style={styles.error}>{error}</Text> : null}
      <Button title='Login' onPress={handleLogin} />
      <Button
        title='Register'
        onPress={() => navigation.navigate("Registration")}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 16,
  },
  input: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    marginBottom: 12,
    paddingHorizontal: 8,
  },
  error: {
    color: "red",
    marginBottom: 12,
  },
});

export default LoginPage;
