import React, { useContext, useState } from "react";
import {
  View,
  TextInput,
  Button,
  StyleSheet,
  TouchableOpacity,
  Text,
  Alert,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { AuthContext } from "../context/AuthContext";
import NotificationComponent from "../../components/NotificationComponent";
import LoginPage from "./LoginPage";
import { useRouter } from "expo-router";

const AddNote = ({}) => {
  const { addNote, user } = useContext(AuthContext);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [category, setCategory] = useState("");
  const [priority, setPriority] = useState("medium");
  const [characterCount, setCharacterCount] = useState(0);
  const [notification, setNotification] = useState(false);

  const router = useRouter();

  const priorities = ["low", "medium", "high"];

  const handleAddNote = () => {
    if (title.trim() && content.trim()) {
      const newNote = {
        id: Date.now().toString(),
        title: title.trim(),
        content: content.trim(),
        category: category.trim(),
        priority,
        createdAt: new Date().toISOString(),
        lastModified: new Date().toISOString(),
      };
      addNote(newNote);
      setNotification(true);
      router.push("/");
    } else {
      Alert.alert("Error", "Title and content are required!");
    }
  };

  const handleContentChange = (text) => {
    setContent(text);
    setCharacterCount(text.length);
  };

  const handleClear = () => {
    Alert.alert("Clear Form", "Are you sure you want to clear all fields?", [
      {
        text: "Cancel",
        style: "cancel",
      },
      {
        text: "Clear",
        onPress: () => {
          setTitle("");
          setContent("");
          setCategory("");
          setPriority("medium");
          setCharacterCount(0);
        },
        style: "destructive",
      },
    ]);
  };

  const handleCancel = () => {
    router.push("/");
  };
  if (!user) {
    return <LoginPage />;
  }

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.container}
    >
      <NotificationComponent
        visible={notification}
        message={"Note Added Successfully"}
        title={"Success"}
        onClose={() => setNotification(false)}
      />
      <View style={styles.topBar}>
        <View style={styles.header}>
          <Text style={styles.headerText}>Create New Note</Text>
          <Text style={styles.headerSubText}>Add your thoughts...</Text>
        </View>
        <TouchableOpacity style={styles.clearButton} onPress={handleClear}>
          <Text style={styles.clearButtonText}>Clear</Text>
        </TouchableOpacity>
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
          placeholder='Category (Optional)'
          value={category}
          onChangeText={setCategory}
          style={styles.categoryInput}
          placeholderTextColor='#666'
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
                      p === "low"
                        ? "#4CAF50"
                        : p === "medium"
                        ? "#FFC107"
                        : "#FF5252",
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
            onPress={handleAddNote}
          >
            <Text style={styles.buttonText}>Save Note</Text>
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
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: "#3949ab", // New dark blue color
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
    backgroundColor: "#3949ab", // Matching with top bar
  },
  buttonText: {
    color: "#fff",
    textAlign: "center",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default AddNote;
