// screens/ModifyNotePage.js
import React, { useContext, useState } from "react";
import {
  View,
  TextInput,
  Button,
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

const ModifyNote = ({ navigation }) => {
  const { modifyNote, notes } = useContext(AuthContext);
  const { id } = useSearchParams();

  const selectedNote = notes.find(
    (item) => item["id"] === (notes["id"] === undefined ? 1 : id)
  );
  const [title, setTitle] = useState(selectedNote.title || "");
  const [content, setContent] = useState(selectedNote.content || "");
  const [characterCount, setCharacterCount] = useState(content.length);

  const handleContentChange = (text) => {
    setContent(text);
    setCharacterCount(text.length);
  };

  const handleModifyNote = () => {
    if (title.trim() && content.trim()) {
      const updatedNote = { ...selectedNote, title: title.trim(), content: content.trim() };
      modifyNote(selectedNote.id, updatedNote);
      Alert.alert("Success", "Note updated successfully!");
      navigation.goBack();
    } else {
      Alert.alert("Error", "Title and content cannot be empty!");
    }
  };

  const handleCancel = () => {
    if (title !== selectedNote.title || content !== selectedNote.content) {
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
          placeholder="Note Title"
          value={title}
          onChangeText={setTitle}
          style={styles.titleInput}
          placeholderTextColor="#666"
          maxLength={50}
        />

        <TextInput
          placeholder="Note Content"
          value={content}
          onChangeText={handleContentChange}
          style={styles.contentInput}
          multiline
          placeholderTextColor="#666"
          textAlignVertical="top"
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
