import React, { useContext } from "react";
import { View, Text, Button, StyleSheet, ScrollView } from "react-native";
import { AuthContext } from "../context/AuthContext";

const HomePage = () => {
  const { user, notes, logout } = useContext(AuthContext);

  return (
    <View style={styles.container}>
      <Text>Welcome, {user?.username}!</Text>
      <Button title='Logout' onPress={logout} />
      <Button title='Add Note' onPress={() => navigation.navigate("AddNote")} />
      <ScrollView>
        {notes.map((item) => (
          <View key={item.id} style={styles.note}>
            <Text>{item.title}</Text>
            <Button
              title='View'
              onPress={() => navigation.navigate("ViewNote", { note: item })}
            />
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  note: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
});

export default HomePage;
