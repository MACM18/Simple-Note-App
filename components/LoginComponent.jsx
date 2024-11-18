import { View, TextInput, Button, Text, StyleSheet } from "react-native";
import { useContext, useState } from "react";
import { AuthContext } from "../app/AppContext";
import { useRouter } from "expo-router";

const LoginComponent = ({ navigation }) => {
  const router = useRouter();
  const { isAuthenticated, setIsAuthenticated, user, setUser } =
    useContext(AuthContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = () => {
    setIsAuthenticated(true);
    // Handle login logic here
    console.log("Login with:", email, password);
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder='Email'
        value={email}
        onChangeText={setEmail}
        keyboardType='email-address'
      />
      <TextInput
        style={styles.input}
        placeholder='Password'
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      <Button title='Login' onPress={handleLogin} />
      <Text style={styles.link} onPress={() => router.replace("register")}>
        Don't have an account? Register
      </Text>
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
  link: {
    marginTop: 12,
    color: "blue",
  },
});

export default LoginComponent;
