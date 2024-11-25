// screens/ViewNotePage.js
import React, { useContext } from "react";
import { View, Text, StyleSheet } from "react-native";
import { AuthContext } from "../context/AuthContext";
import { useSearchParams } from "expo-router/build/hooks";

const ViewNote = () => {
  const { notes } = useContext(AuthContext);
  const { note } = useSearchParams;
  const selectedNote = notes.find(
    (item) => item["id"] == (notes["id"] == undefined ? 1 : note["id"])
  );
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{selectedNote.title}</Text>
      <Text style={styles.content}>{selectedNote.description}</Text>
      <Text style={styles.content}>{selectedNote.status}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 12,
  },
  content: {
    fontSize: 16,
  },
});

export default ViewNote;
