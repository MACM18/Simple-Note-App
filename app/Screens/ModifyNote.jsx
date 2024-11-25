// screens/ModifyNotePage.js
import React, { useContext, useState } from "react";
import { View, TextInput, Button, StyleSheet } from "react-native";
import { AuthContext } from "../context/AuthContext";

const ModifyNote = ({ route, navigation }) => {
  const { modifyNote } = useContext(AuthContext);
  const { note } = route.params;

  const [title, setTitle] = useState(note.title);
  const [content, setContent] = useState(note.content);

  const handleModifyNote = () => {
    const updatedNote = { ...note, title, content };
    modifyNote(note.id, updatedNote);
    navigation.navigate("Home");
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
