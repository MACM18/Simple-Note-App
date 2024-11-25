import React, { useContext, useEffect } from "react";
import {
  View,
  Text,
  Button,
  StyleSheet,
  ScrollView,
  ActivityIndicator,
} from "react-native";
import { AuthContext } from "../context/AuthContext";
import { useRouter } from "expo-router";

const HomePage = () => {
  const { user, notes, logout, loading } = useContext(AuthContext);
  const router = useRouter();

  useEffect(() => {
    // Check if loading is complete and user is null
    if (!loading) {
      if (user == null) {
        router.push("/Screens/LoginPage");
      }
    }
  }, [user, loading]); // Run this effect when user or loading changes

  if (loading) {
    return <ActivityIndicator size='large' color='#0000ff' />; // Show a loading indicator
  }

  return (
    <View style={styles.container}>
      <Text>Welcome, {user?.username}!</Text>
      <Button title='Logout' onPress={logout} />
      <Button
        title='Add Note'
        onPress={() => router.push("/Screens/AddNote")}
      />
      <ScrollView>
        {notes.map((item) => (
          <View key={item.id} style={styles.note}>
            <Text>{item.title}</Text>
            <Button
              title='View'
              onPress={() => router.push("/Screens/ViewNote", { note: item })}
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
