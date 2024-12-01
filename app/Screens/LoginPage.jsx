import React, { useContext, useState } from "react";
import {
  View,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Text,
  Alert,
  KeyboardAvoidingView,
  Platform,
  Image,
} from "react-native";
import { AuthContext } from "../context/AuthContext";
import { useRouter } from "expo-router";
import { Formik } from "formik";
import * as Yup from "yup";

const LoginPage = () => {
  const { login } = useContext(AuthContext);
  const router = useRouter();

  const validationSchema = Yup.object().shape({
    username: Yup.string().required("Username is required").trim(),
    password: Yup.string().required("Password is required").trim(),
  });

  const handleLogin = (values) => {
    login(values.username, values.password);
    router.push("/");
  };

  const handleClear = (resetForm) => {
    Alert.alert("Clear Form", "Are you sure you want to clear all fields?", [
      {
        text: "Cancel",
        style: "cancel",
      },
      {
        text: "Clear",
        onPress: () => {
          resetForm();
        },
        style: "destructive",
      },
    ]);
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.container}
    >
      <View style={styles.topBar}>
        <View style={styles.header}>
          <Text style={styles.headerText}>Welcome Back</Text>
          <Text style={styles.headerSubText}>Sign in to continue...</Text>
        </View>
      </View>
      <View>
        <Formik
          initialValues={{ username: "", password: "" }}
          validationSchema={validationSchema}
          onSubmit={handleLogin}
        >
          {({
            handleChange,
            handleBlur,
            handleSubmit,
            values,
            errors,
            touched,
            resetForm,
          }) => (
            <>
              <TouchableOpacity
                style={styles.clearButton}
                onPress={() => handleClear(resetForm)}
              >
                <Text style={styles.clearButtonText}>Clear</Text>
              </TouchableOpacity>

              <View style={styles.formContainer}>
                <View style={styles.inputContainer}>
                  <Text style={styles.label}>Username</Text>
                  <TextInput
                    placeholder='Enter your username'
                    value={values.username}
                    onChangeText={handleChange("username")}
                    onBlur={handleBlur("username")}
                    style={styles.input}
                    placeholderTextColor='#666'
                    autoCapitalize='none'
                  />
                  {errors.username && touched.username && (
                    <Text style={styles.error}>{errors.username}</Text>
                  )}
                </View>

                <View style={styles.inputContainer}>
                  <Text style={styles.label}>Password</Text>
                  <TextInput
                    placeholder='Enter your password'
                    value={values.password}
                    onChangeText={handleChange("password")}
                    onBlur={handleBlur("password")}
                    secureTextEntry={true}
                    style={styles.input}
                    placeholderTextColor='#666'
                  />
                  {errors.password && touched.password && (
                    <Text style={styles.error}>{errors.password}</Text>
                  )}
                </View>

                <View style={styles.buttonContainer}>
                  <TouchableOpacity
                    style={[styles.button, styles.loginButton]}
                    onPress={handleSubmit}
                  >
                    <Text style={styles.buttonText}>Login</Text>
                  </TouchableOpacity>

                  <TouchableOpacity
                    style={[styles.button, styles.registerButton]}
                    onPress={() => router.push("/Screens/RegistrationPage")}
                  >
                    <Text style={styles.buttonText}>Register</Text>
                  </TouchableOpacity>
                </View>

                <TouchableOpacity
                  style={styles.forgotPassword}
                  onPress={() => "Remember the password Idiot"}
                >
                  <Text style={styles.forgotPasswordText}>
                    Forgot Password?
                  </Text>
                </TouchableOpacity>
              </View>
            </>
          )}
        </Formik>
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
  topBar: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: "#3949ab",
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
  },
  header: {
    flex: 1,
  },
  headerText: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#ffffff",
    marginBottom: 4,
  },
  headerSubText: {
    fontSize: 14,
    color: "#e3f2fd",
    fontStyle: "italic",
  },
  clearButton: {
    backgroundColor: "rgba(255, 255, 255, 0.2)",
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.3)",
  },
  clearButtonText: {
    color: "#ffffff",
    fontSize: 16,
    fontWeight: "500",
  },
  formContainer: {
    flex: 1,
    padding: 16,
    justifyContent: "center",
  },
  inputContainer: {
    marginBottom: 16,
  },
  label: {
    fontSize: 16,
    color: "#333",
    marginBottom: 8,
    fontWeight: "500",
  },
  input: {
    height: 50,
    borderColor: "#ddd",
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 16,
    fontSize: 16,
    backgroundColor: "#fff",
    color: "#333",
  },
  passwordContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderColor: "#ddd",
    borderWidth: 1,
    borderRadius: 8,
    backgroundColor: "#fff",
  },
  passwordInput: {
    flex: 1,
    height: 50,
    paddingHorizontal: 16,
    fontSize: 16,
    color: "#333",
  },
  eyeIcon: {
    padding: 10,
  },
  eyeIconText: {
    fontSize: 20,
  },
  error: {
    color: "#FF5252",
    marginBottom: 16,
    textAlign: "center",
    fontSize: 14,
  },
  buttonContainer: {
    marginTop: 24,
    gap: 12,
  },
  button: {
    padding: 16,
    borderRadius: 8,
    alignItems: "center",
  },
  loginButton: {
    backgroundColor: "#3949ab",
  },
  registerButton: {
    backgroundColor: "#666",
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  forgotPassword: {
    marginTop: 16,
    alignItems: "center",
  },
  forgotPasswordText: {
    color: "#3949ab",
    fontSize: 14,
    fontWeight: "500",
  },
});

export default LoginPage;
