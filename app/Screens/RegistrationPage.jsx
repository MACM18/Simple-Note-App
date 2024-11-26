// screens/RegistrationPage.js
import React, { useState, useRef } from "react";
import {
  View,
  TextInput,
  TouchableOpacity,
  Text,
  StyleSheet,
  Alert,
  KeyboardAvoidingView,
  Platform,
  Animated,
  Easing,
} from "react-native";
import Icon from "react-native-vector-icons/Ionicons";

const RegistrationPage = ({ navigation }) => {
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [isDarkTheme, setIsDarkTheme] = useState(false);

  const scaleValue = useRef(new Animated.Value(0)).current;

  const startAnimations = () => {
    Animated.timing(scaleValue, {
      toValue: 1,
      duration: 1000,
      easing: Easing.bounce,
      useNativeDriver: true,
    }).start();
  };

  React.useEffect(() => {
    startAnimations();
  }, []);

  const handleRegistration = () => {
    if (password !== confirmPassword) {
      setError("Passwords don't match");
    } else {
      Alert.alert("Success", "Registration complete!");
      navigation.navigate("Login");
    }
  };

  const themeStyles = isDarkTheme
    ? {
        backgroundColor: "#121212",
        textColor: "#ffffff",
        inputBackgroundColor: "#1e1e1e",
        placeholderColor: "#888",
      }
    : {
        backgroundColor: "#f5f5f5",
        textColor: "#000000",
        inputBackgroundColor: "#ffffff",
        placeholderColor: "#666",
      };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={[styles.container, { backgroundColor: themeStyles.backgroundColor }]}
    >
      {/* Header Section */}
      <View style={[styles.header, { backgroundColor: "#3949ab" }]}>
        <Animated.Text
          style={[
            styles.headerText,
            { transform: [{ scale: scaleValue }], color: "#ffffff" },
          ]}
        >
          Register
        </Animated.Text>
        <Text style={[styles.headerSubText, { color: "#e3f2fd" }]}>
          Create your account
        </Text>
        {/* Toggle Button */}
        <TouchableOpacity
          style={styles.themeToggle}
          onPress={() => setIsDarkTheme(!isDarkTheme)}
        >
          <Icon
            name={isDarkTheme ? "sunny" : "moon"}
            size={24}
            color="#ffffff"
          />
        </TouchableOpacity>
      </View>

      {/* Form Section */}
      <View style={styles.form}>
        <TextInput
          placeholder="Name"
          value={name}
          onChangeText={setName}
          style={[
            styles.input,
            {
              backgroundColor: themeStyles.inputBackgroundColor,
              color: themeStyles.textColor,
            },
          ]}
          placeholderTextColor={themeStyles.placeholderColor}
        />
        <TextInput
          placeholder="Username"
          value={username}
          onChangeText={setUsername}
          style={[
            styles.input,
            {
              backgroundColor: themeStyles.inputBackgroundColor,
              color: themeStyles.textColor,
            },
          ]}
          placeholderTextColor={themeStyles.placeholderColor}
        />
        <TextInput
          placeholder="Email"
          value={email}
          onChangeText={setEmail}
          style={[
            styles.input,
            {
              backgroundColor: themeStyles.inputBackgroundColor,
              color: themeStyles.textColor,
            },
          ]}
          placeholderTextColor={themeStyles.placeholderColor}
          keyboardType="email-address"
        />
        <TextInput
          placeholder="Password"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
          style={[
            styles.input,
            {
              backgroundColor: themeStyles.inputBackgroundColor,
              color: themeStyles.textColor,
            },
          ]}
          placeholderTextColor={themeStyles.placeholderColor}
        />
        <TextInput
          placeholder="Confirm Password"
          value={confirmPassword}
          onChangeText={setConfirmPassword}
          secureTextEntry
          style={[
            styles.input,
            {
              backgroundColor: themeStyles.inputBackgroundColor,
              color: themeStyles.textColor,
            },
          ]}
          placeholderTextColor={themeStyles.placeholderColor}
        />
        {error ? <Text style={styles.error}>{error}</Text> : null}

        {/* Buttons */}
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={[styles.button, styles.registerButton]}
            onPress={handleRegistration}
          >
            <Text style={styles.buttonText}>Register</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.button, styles.backButton]}
            onPress={() => navigation.navigate("Login")}
          >
            <Text style={styles.buttonText}>Back to Login</Text>
          </TouchableOpacity>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    paddingHorizontal: 16,
    paddingVertical: 20,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  headerText: {
    fontSize: 28,
    fontWeight: "bold",
  },
  headerSubText: {
    fontSize: 16,
    fontStyle: "italic",
  },
  themeToggle: {
    padding: 8,
    borderRadius: 20,
    backgroundColor: "rgba(255, 255, 255, 0.1)",
  },
  form: {
    flex: 1,
    padding: 16,
  },
  input: {
    height: 50,
    borderColor: "#ddd",
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 12,
    paddingHorizontal: 16,
    fontSize: 16,
  },
  error: {
    color: "#FF5252",
    marginBottom: 12,
    textAlign: "center",
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 16,
  },
  button: {
    flex: 1,
    padding: 16,
    borderRadius: 8,
    marginHorizontal: 4,
  },
  registerButton: {
    backgroundColor: "#3949ab",
  },
  backButton: {
    backgroundColor: "#3949ab",
  },
  buttonText: {
    color: "#fff",
    textAlign: "center",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default RegistrationPage;
