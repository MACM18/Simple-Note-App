// components/NotificationComponent.js
import React, { useEffect, useRef } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Animated,
  Easing,
} from "react-native";

const NotificationComponent = ({ visible, title, message, onClose }) => {
  const translateY = useRef(new Animated.Value(-100)).current; // Start off-screen
  const scale = useRef(new Animated.Value(0)).current; // Start with scale 0

  useEffect(() => {
    if (visible) {
      // Slide in and fade in effect
      Animated.parallel([
        Animated.timing(translateY, {
          toValue: 0,
          duration: 500,
          easing: Easing.ease,
          useNativeDriver: true,
        }),
        Animated.timing(scale, {
          toValue: 1,
          duration: 500,
          easing: Easing.ease,
          useNativeDriver: true,
        }),
      ]).start();

      // Timeout to remove the notification after 1 second
      const timeout = setTimeout(() => {
        // Slide out and scale down effect
        Animated.parallel([
          Animated.timing(translateY, {
            toValue: -100, // Move off-screen
            duration: 300,
            easing: Easing.ease,
            useNativeDriver: true,
          }),
          Animated.timing(scale, {
            toValue: 0,
            duration: 300,
            easing: Easing.ease,
            useNativeDriver: true,
          }),
        ]).start(() => onClose()); // Call onClose after animation
      }, 1000);

      return () => clearTimeout(timeout); // Cleanup timeout on unmount
    }
  }, [visible, onClose, translateY, scale]);

  if (!visible) return null; // Don't render if not visible

  return (
    <Animated.View
      style={[
        styles.container,
        {
          transform: [{ translateY }, { scale }],
        },
      ]}
    >
      <View style={styles.notification}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.message}>{message}</Text>
        <TouchableOpacity onPress={onClose} style={styles.closeButton}>
          <Text style={styles.closeButtonText}>✖</Text>
        </TouchableOpacity>
      </View>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    top: 50,
    right: 20,
    zIndex: 1000,
  },
  notification: {
    backgroundColor: "rgba(255, 255, 255, 0.8)", // Glass-like effect
    borderRadius: 10,
    padding: 16,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  title: {
    fontWeight: "bold",
    fontSize: 16,
  },
  message: {
    fontSize: 14,
    marginVertical: 4,
  },
  closeButton: {
    position: "absolute",
    top: 8,
    right: 8,
  },
  closeButtonText: {
    fontSize: 16,
    color: "#FF5252",
  },
});

export default NotificationComponent;
