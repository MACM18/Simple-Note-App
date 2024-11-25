// screens/RegistrationPage.js
import React, { useState } from "react";
import { View, TextInput, Button, Text, StyleSheet } from "react-native";

const RegistrationPage = ({ navigation }) => {
  const [name, setName] = useState("");
  const [regNo, setRegNo] = useState("");
  const [indexNo, setIndexNo] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");

  const handleRegistration = () => {
    if (password !== confirmPassword) {
      setError("Passwords don't match");
    } else {
      // Handle registration logic here
      navigation.navigate("Login");
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        placeholder='Name'
        value={name}
        onChangeText={setName}
        style={styles.input}
      />
      <TextInput
        placeholder='Registration No'
        value={regNo}
        onChangeText={setRegNo}
        style={styles.input}
      />
      <TextInput
        placeholder='Index No'
        value={indexNo}
        onChangeText={setIndexNo}
        style={styles.input}
      />
      <TextInput
        placeholder='Username'
        value={username}
        onChangeText={setUsername}
        style={styles.input}
      />
      <TextInput
        placeholder='Email'
        value={email}
        onChangeText={setEmail}
        style={styles.input}
      />
      <TextInput
        placeholder='Password'
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        style={styles.input}
      />
      <TextInput
        placeholder='Confirm Password'
        value={confirmPassword}
        onChangeText={setConfirmPassword}
        secureTextEntry
        style={styles.input}
      />
      {error ? <Text style={styles.error}>{error}</Text> : null}
      <Button title='Register' onPress={handleRegistration} />
      <Button
        title='Back to Login'
        onPress={() => navigation.navigate("Login")}
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

export default RegistrationPage;
