// screens/RegistrationPage.js
import React, { useState, useRef, useContext } from "react";
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
import { AuthContext } from "../context/AuthContext";
import { useRouter } from "expo-router";
import AlertComponent from "../../components/AlertComponent";
import { Formik } from "formik";
import * as Yup from "yup";

const RegistrationPage = () => {
  const [isDarkTheme, setIsDarkTheme] = useState(false);
  const { register } = useContext(AuthContext);
  const [alertVisibility, setAlertVisibility] = useState(false);
  const router = useRouter();
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

  const validationSchema = Yup.object().shape({
    name: Yup.string().required("Name is required"),
    username: Yup.string().required("Username is required"),
    email: Yup.string().email("Invalid email").required("Email is required"),
    password: Yup.string()
      .min(6, "Password must be at least 6 characters")
      .required("Password is required"),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref("password"), null], "Passwords must match")
      .required("Confirm Password is required"),
  });

  const handleRegistration = (values) => {
    register(values.username, values.password);
    router.push("/Screens/LoginPage");
    setAlertVisibility(false);
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
      style={[
        styles.container,
        { backgroundColor: themeStyles.backgroundColor },
      ]}
    >
      <AlertComponent
        title={`Confirm user`}
        button={"Create"}
        description={"Are you sure you want to create this account ?"}
        onConfirm={() => handleRegistration()}
        onClose={() => setAlertVisibility(false)}
        visible={alertVisibility}
      />
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
            color='#ffffff'
          />
        </TouchableOpacity>
      </View>

      {/* Form Section */}
      <Formik
        initialValues={{
          name: "",
          username: "",
          email: "",
          password: "",
          confirmPassword: "",
        }}
        validationSchema={validationSchema}
        onSubmit={(values) => {
          setAlertVisibility(true);
        }}
      >
        {({ handleChange, handleBlur, values, errors, touched }) => (
          <View style={styles.form}>
            <TextInput
              placeholder='Name'
              value={values.name}
              onChangeText={handleChange("name")}
              onBlur={handleBlur("name")}
              style={[
                styles.input,
                {
                  backgroundColor: themeStyles.inputBackgroundColor,
                  color: themeStyles.textColor,
                },
              ]}
              placeholderTextColor={themeStyles.placeholderColor}
            />
            {errors.name && touched.name && (
              <Text style={styles.errorText}>{errors.name}</Text>
            )}

            <TextInput
              placeholder='Username'
              value={values.username}
              onChangeText={handleChange("username")}
              onBlur={handleBlur("username")}
              style={[
                styles.input,
                {
                  backgroundColor: themeStyles.inputBackgroundColor,
                  color: themeStyles.textColor,
                },
              ]}
              placeholderTextColor={themeStyles.placeholderColor}
            />
            {errors.username && touched.username && (
              <Text style={styles.errorText}>{errors.username}</Text>
            )}

            <TextInput
              placeholder='Email'
              value={values.email}
              onChangeText={handleChange("email")}
              onBlur={handleBlur("email")}
              style={[
                styles.input,
                {
                  backgroundColor: themeStyles.inputBackgroundColor,
                  color: themeStyles.textColor,
                },
              ]}
              placeholderTextColor={themeStyles.placeholderColor}
            />
            {errors.email && touched.email && (
              <Text style={styles.errorText}>{errors.email}</Text>
            )}

            <TextInput
              placeholder='Password'
              value={values.password}
              onChangeText={handleChange("password")}
              onBlur={handleBlur("password")}
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
            {errors.password && touched.password && (
              <Text style={styles.errorText}>{errors.password}</Text>
            )}

            <TextInput
              placeholder='Confirm Password'
              value={values.confirmPassword}
              onChangeText={handleChange("confirmPassword")}
              onBlur={handleBlur("confirmPassword")}
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
            {errors.confirmPassword && touched.confirmPassword && (
              <Text style={styles.errorText}>{errors.confirmPassword}</Text>
            )}

            <TouchableOpacity
              onPress={() => handleRegistration(values)}
              style={styles.submitButton}
            >
              <Text style={styles.submitButtonText}>Register</Text>
            </TouchableOpacity>
          </View>
        )}
      </Formik>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  header: {
    alignItems: "center",
    marginBottom: 20,
  },
  headerText: {
    fontSize: 24,
    fontWeight: "bold",
  },
  headerSubText: {
    fontSize: 16,
  },
  themeToggle: {
    marginTop: 10,
  },
  form: {
    flex: 1,
  },
  input: {
    height: 50,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 10,
  },
  errorText: {
    color: "red",
    fontSize: 12,
  },
  submitButton: {
    backgroundColor: "#3949ab",
    padding: 15,
    borderRadius: 5,
    alignItems: "center",
  },
  submitButtonText: {
    color: "#ffffff",
    fontWeight: "bold",
  },
});

export default RegistrationPage;
