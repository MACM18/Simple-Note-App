// screens/AddNotePage.js
import React, { useContext, useState } from "react";
import { View, TextInput, Button, StyleSheet } from "react-native";
import { AuthContext } from "../context/AuthContext";

const AddNote = () => {
  const { addNote } = useContext(AuthContext);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const handleAddNote = () => {
    if (title && content) {
      const newNote = { id: Date.now().toString(), title, content };
      addNote(newNote);
      navigation.navigate("Home");
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        placeholder='Note Title'
        value={title}
        onChangeText={setTitle}
        style={styles.input}
      />
      <TextInput
        placeholder='Note Content'
        value={content}
        onChangeText={setContent}
        style={styles.input}
        multiline
      />
      <Button title='Save Note' onPress={handleAddNote} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  input: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    marginBottom: 12,
    paddingHorizontal: 8,
  },
});

export default AddNote;
