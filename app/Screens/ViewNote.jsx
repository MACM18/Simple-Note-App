// screens/ViewNotePage.js
import React from "react";
import { View, Text, StyleSheet } from "react-native";

const ViewNote = ({ route }) => {
  const { note } = route.params;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{note.title}</Text>
      <Text style={styles.content}>{note.content}</Text>
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
