// screens/ModifyNotePage.js
import React, { useContext, useState } from "react";
import { View, TextInput, Button, StyleSheet } from "react-native";
import { AuthContext } from "../context/AuthContext";
import { useSearchParams } from "expo-router/build/hooks";

const ModifyNote = () => {
  const { modifyNote, notes } = useContext(AuthContext);
  const { id } = useSearchParams;

  const selectedNote = notes.find(
    (item) => item["id"] == (notes["id"] == undefined ? 1 : id)
  );
  const [title, setTitle] = useState(selectedNote.title);
  const [content, setContent] = useState(selectedNote.content);

  const handleModifyNote = () => {
    const updatedNote = { ...selectedNote, title, content };
    modifyNote(selectedNote.id, updatedNote);
    // navigation.navigate("Home");
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
      <Button title='Save Changes' onPress={handleModifyNote} />
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

export default ModifyNote;
