// LogoutModal.js
import React from "react";
import { Modal, View, Text, StyleSheet, TouchableOpacity } from "react-native";

const AlertComponent = ({
  title,
  button,
  description,
  visible,
  onClose,
  onConfirm,
}) => {
  return (
    <Modal
      transparent={true}
      animationType='slide'
      visible={visible}
      onRequestClose={onClose}
    >
      <View style={styles.overlay}>
        <View style={styles.modalContainer}>
          <Text style={styles.title}>{title}</Text>
          <Text style={styles.message}>{description}</Text>
          <View style={styles.buttonContainer}>
            <TouchableOpacity onPress={onClose} style={styles.cancelButton}>
              <Text style={styles.buttonText}>Cancel</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={onConfirm} style={styles.logoutButton}>
              <Text style={styles.buttonText}>{button}</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContainer: {
    width: 300,
    padding: 20,
    backgroundColor: "white",
    borderRadius: 10,
    alignItems: "center",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
  },
  message: {
    fontSize: 16,
    marginBottom: 20,
    textAlign: "center",
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
  },
  cancelButton: {
    flex: 1,
    padding: 10,
    alignItems: "center",
    backgroundColor: "#ccc",
    borderRadius: 5,
    marginRight: 10,
  },
  logoutButton: {
    flex: 1,
    padding: 10,
    alignItems: "center",
    backgroundColor: "red",
    borderRadius: 5,
    marginLeft: 10,
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
  },
});

export default AlertComponent;
