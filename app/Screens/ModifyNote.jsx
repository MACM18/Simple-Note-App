// screens/ModifyNotePage.js
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
  ScrollView,
} from "react-native";
import { AuthContext } from "../context/AuthContext";
import { useSearchParams } from "expo-router/build/hooks";
import LoginPage from "./LoginPage";

const ModifyNote = ({ navigation }) => {
  const { modifyNote, notes, user } = useContext(AuthContext);
  const { id } = useSearchParams();

  const selectedNote = notes.find(
    (item) => item["id"] === (notes["id"] === undefined ? 1 : id)
  );

  const [title, setTitle] = useState(selectedNote.title || "");
  const [content, setContent] = useState(selectedNote.content || "");
  const [category, setCategory] = useState(selectedNote.category || "");
  const [priority, setPriority] = useState(selectedNote.priority || "medium");
  const [characterCount, setCharacterCount] = useState(content.length);

  const priorities = ["low", "medium", "high"];

  const handleContentChange = (text) => {
    setContent(text);
    setCharacterCount(text.length);
  };

  const handleModifyNote = () => {
    if (title.trim() && content.trim()) {
      const updatedNote = {
        ...selectedNote,
        title: title.trim(),
        content: content.trim(),
        category: category.trim(),
        priority,
        lastModified: new Date().toISOString(),
      };
      modifyNote(selectedNote.id, updatedNote);
      Alert.alert("Success", "Note updated successfully!");
      navigation.goBack();
    } else {
      Alert.alert("Error", "Title and content cannot be empty!");
    }
  };

  const handleCancel = () => {
    if (
      title !== selectedNote.title ||
      content !== selectedNote.content ||
      category !== selectedNote.category ||
      priority !== selectedNote.priority
    ) {
      Alert.alert(
        "Discard Changes",
        "Are you sure you want to discard your changes?",
        [
          { text: "Cancel", style: "cancel" },
          {
            text: "Discard",
            onPress: () => navigation.goBack(),
            style: "destructive",
          },
        ]
      );
    } else {
      navigation.goBack();
    }
  };

  if (!user) {
    return <LoginPage />;
  }
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.container}
    >
      <View style={styles.topBar}>
        <View style={styles.header}>
          <Text style={styles.headerText}>Modify Note</Text>
          <Text style={styles.headerSubText}>Edit your note details below</Text>
        </View>
      </View>
      <ScrollView style={styles.scrollView}>
        <TextInput
          placeholder='Note Title'
          value={title}
          onChangeText={setTitle}
          style={styles.titleInput}
          placeholderTextColor='#666'
          maxLength={50}
        />

        <TextInput
          placeholder="Category (Optional)"
          value={category}
          onChangeText={setCategory}
          style={styles.categoryInput}
          placeholderTextColor="#666"
        />

        <View style={styles.priorityContainer}>
          <Text style={styles.priorityLabel}>Priority:</Text>
          <View style={styles.priorityButtons}>
            {priorities.map((p) => (
              <TouchableOpacity
                key={p}
                style={[
                  styles.priorityButton,
                  priority === p && styles.priorityButtonActive,
                  {
                    backgroundColor:
                      p === "low" ? "#4CAF50" : p === "medium" ? "#FFC107" : "#FF5252",
                  },
                ]}
                onPress={() => setPriority(p)}
              >
                <Text
                  style={[
                    styles.priorityButtonText,
                    priority === p && styles.priorityButtonTextActive,
                  ]}
                >
                  {p.charAt(0).toUpperCase() + p.slice(1)}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        <TextInput
          placeholder="Category (Optional)"
          value={category}
          onChangeText={setCategory}
          style={styles.categoryInput}
          placeholderTextColor="#666"
        />

        <View style={styles.priorityContainer}>
          <Text style={styles.priorityLabel}>Priority:</Text>
          <View style={styles.priorityButtons}>
            {priorities.map((p) => (
              <TouchableOpacity
                key={p}
                style={[
                  styles.priorityButton,
                  priority === p && styles.priorityButtonActive,
                  {
                    backgroundColor:
                      p === "low" ? "#4CAF50" : p === "medium" ? "#FFC107" : "#FF5252",
                  },
                ]}
                onPress={() => setPriority(p)}
              >
                <Text
                  style={[
                    styles.priorityButtonText,
                    priority === p && styles.priorityButtonTextActive,
                  ]}
                >
                  {p.charAt(0).toUpperCase() + p.slice(1)}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        <TextInput
          placeholder='Note Content'
          value={content}
          onChangeText={handleContentChange}
          style={styles.contentInput}
          multiline
          placeholderTextColor='#666'
          textAlignVertical='top'
        />

        <Text style={styles.characterCount}>
          Characters: {characterCount}/1000
        </Text>

        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={[styles.button, styles.cancelButton]}
            onPress={handleCancel}
          >
            <Text style={styles.buttonText}>Cancel</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.button, styles.saveButton]}
            onPress={handleModifyNote}
          >
            <Text style={styles.buttonText}>Save Changes</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
  topBar: {
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
  scrollView: {
    flex: 1,
    padding: 16,
  },
  titleInput: {
    height: 50,
    borderColor: "#ddd",
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 12,
    paddingHorizontal: 16,
    fontSize: 16,
    backgroundColor: "#fff",
    color: "#333",
  },
  categoryInput: {
    height: 50,
    borderColor: "#ddd",
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 12,
    paddingHorizontal: 16,
    fontSize: 16,
    backgroundColor: "#fff",
    color: "#333",
  },
  priorityContainer: {
    marginBottom: 12,
  },
  priorityLabel: {
    fontSize: 16,
    marginBottom: 8,
    color: "#333",
  },
  priorityButtons: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  priorityButton: {
    flex: 1,
    padding: 10,
    borderRadius: 8,
    marginHorizontal: 4,
    opacity: 0.7,
  },
  priorityButtonActive: {
    opacity: 1,
  },
  priorityButtonText: {
    color: "#fff",
    textAlign: "center",
    fontWeight: "bold",
  },
  priorityButtonTextActive: {
    color: "#fff",
  },
  contentInput: {
    height: 200,
    borderColor: "#ddd",
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 8,
    paddingHorizontal: 16,
    paddingTop: 12,
    fontSize: 16,
    backgroundColor: "#fff",
    color: "#333",
  },
  characterCount: {
    textAlign: "right",
    color: "#666",
    marginBottom: 16,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 8,
  },
  button: {
    flex: 1,
    padding: 16,
    borderRadius: 8,
    marginHorizontal: 4,
  },
  cancelButton: {
    backgroundColor: "#666",
  },
  saveButton: {
    backgroundColor: "#3949ab",
  },
  buttonText: {
    color: "#fff",
    textAlign: "center",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default ModifyNote;
