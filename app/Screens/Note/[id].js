import React, { useContext } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Alert } from "react-native";
import { AuthContext } from "../../context/AuthContext";

import LoginPage from "../LoginPage";
import { useLocalSearchParams, useRouter } from "expo-router";

const ViewNote = () => {
  const { notes, user } = useContext(AuthContext);
  const { id } = useLocalSearchParams();
  const selectedNote = notes.find((item) => item.id == (id || 1));
  const router = useRouter();

  const handleDelete = () => {
    Alert.alert("Delete Note", "Are you sure you want to delete this note?", [
      { text: "Cancel", style: "cancel" },
      {
        text: "Delete",
        style: "destructive",
        onPress: () => {
          // Placeholder delete logic
          Alert.alert("Deleted", "Note has been deleted.");
          navigation.goBack();
        },
      },
    ]);
  };

  const handleCreateNote = () => {
    navigation.navigate("AddNote");
  };

  if (!user) {
    return <LoginPage />;
  }
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.createButton}
          onPress={handleCreateNote}
        >
          <Text style={styles.createButtonText}>Create Note</Text>
        </TouchableOpacity>
        <Text style={styles.headerText}>View Note</Text>
      </View>

      <View style={styles.noteContainer}>
        <View style={styles.noteContent}>
          <Text style={styles.title}>{selectedNote.title || "Untitled"}</Text>
          <Text style={styles.category}>
            {selectedNote.category || "No Category"}
          </Text>
          <Text style={styles.priority}>
            Priority: {selectedNote.priority.toUpperCase() || "Medium"}
          </Text>
          <Text style={styles.content}>
            {selectedNote.content || "No content available."}
          </Text>
        </View>
        <TouchableOpacity style={styles.deleteButton} onPress={handleDelete}>
          <Text style={styles.deleteIcon}>🗑️</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.deleteButton}
          onPress={() => router.push(`./Edit/${selectedNote.id}`)}
        >
          <Text style={styles.deleteIcon}>📝</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
    padding: 16,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
    padding: 12,
    backgroundColor: "#3949ab",
    borderRadius: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  headerText: {
    flex: 1,
    fontSize: 20,
    fontWeight: "bold",
    color: "#ffffff",
    textAlign: "center",
  },
  createButton: {
    backgroundColor: "rgba(255, 255, 255, 0.2)",
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.3)",
  },
  createButtonText: {
    color: "#ffffff",
    fontSize: 14,
    fontWeight: "500",
  },
  noteContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#ffffff",
    padding: 16,
    borderRadius: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  },
  noteContent: {
    flex: 1,
    marginRight: 8, // Add space between content and delete button
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 8,
  },
  category: {
    fontSize: 14,
    color: "#666",
    marginBottom: 4,
    fontStyle: "italic",
  },
  priority: {
    fontSize: 14,
    color: "#3949ab",
    marginBottom: 12,
    fontWeight: "600",
  },
  content: {
    fontSize: 16,
    color: "#333",
    lineHeight: 22,
    marginBottom: 16,
  },
  deleteButton: {
    backgroundColor: "#FF5252",
    padding: 8,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
  },
  deleteIcon: {
    color: "#ffffff",
    fontSize: 16,
  },
});

export default ViewNote;
