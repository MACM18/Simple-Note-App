import React, { useContext, useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
  ActivityIndicator,
  Platform,
  Alert,
} from "react-native";
import { AuthContext } from "../context/AuthContext";
import { useRouter } from "expo-router";
import LoginPage from "./LoginPage";

const HomePage = () => {
  const { user, notes, logout, loading, setUser } = useContext(AuthContext);
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");
  //   useEffect(() => {
  //     if (!loading && user == null) {
  //       router.push("/Screens/LoginPage");
  //     }
  //   }, [user, loading]);

  const handleLogout = () => {
    Alert.alert("Logout", "Are you sure you want to logout?", [
      {
        text: "Cancel",
        style: "cancel",
      },
      {
        text: "Logout",
        onPress: logout,
        style: "destructive",
      },
    ]);
  };

  const filteredNotes = notes.filter(
    (note) =>
      note.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      note.content?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size='large' color='#3949ab' />
        <Text style={styles.loadingText}>Loading your notes...</Text>
      </View>
    );
  }
  if (!user) {
    return <LoginPage />;
  }

  const getPriorityColor = (priority) => {
    switch (priority?.toLowerCase()) {
      case "high":
        return "#FF5252";
      case "medium":
        return "#FFC107";
      case "low":
        return "#4CAF50";
      default:
        return "#FFC107";
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.topBar}>
        <View style={styles.header}>
          <Text style={styles.headerText}>Welcome, {user?.username}!</Text>
          <Text style={styles.headerSubText}>Your Personal Notes</Text>
        </View>
        <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
          <Text style={styles.logoutButtonText}>Logout</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchInput}
          placeholder='Search notes...'
          value={searchQuery}
          onChangeText={setSearchQuery}
          placeholderTextColor='#666'
        />
      </View>

      <ScrollView style={styles.scrollView}>
        {filteredNotes.length === 0 ? (
          <View style={styles.emptyState}>
            <Text style={styles.emptyStateText}>No notes found</Text>
            <Text style={styles.emptyStateSubText}>
              {searchQuery
                ? "Try a different search term"
                : "Start creating your first note!"}
            </Text>
          </View>
        ) : (
          filteredNotes.map((item) => (
            <TouchableOpacity
              key={item.id}
              style={styles.noteCard}
              onPress={() => router.push("/Screens/ViewNote", { note: item })}
            >
              <View style={styles.noteHeader}>
                <Text style={styles.noteTitle} numberOfLines={1}>
                  {item.title}
                </Text>
                <View
                  style={[
                    styles.priorityIndicator,
                    { backgroundColor: getPriorityColor(item.priority) },
                  ]}
                />
              </View>

              {item.category && (
                <Text style={styles.categoryText}>{item.category}</Text>
              )}

              <Text style={styles.noteContent} numberOfLines={2}>
                {item.content}
              </Text>

              <Text style={styles.dateText}>
                {new Date(item.createdAt).toLocaleDateString()}
              </Text>
            </TouchableOpacity>
          ))
        )}
      </ScrollView>

      <TouchableOpacity
        style={styles.addButton}
        onPress={() => router.push("/Screens/AddNote")}
      >
        <Text style={styles.addButtonText}>+</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f5f5f5",
  },
  loadingText: {
    marginTop: 12,
    fontSize: 16,
    color: "#666",
  },
  topBar: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
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
  logoutButton: {
    backgroundColor: "rgba(255, 255, 255, 0.2)",
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.3)",
  },
  logoutButtonText: {
    color: "#ffffff",
    fontSize: 16,
    fontWeight: "500",
  },
  searchContainer: {
    padding: 16,
    paddingBottom: 8,
  },
  searchInput: {
    height: 40,
    backgroundColor: "#fff",
    borderRadius: 20,
    paddingHorizontal: 16,
    fontSize: 16,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    elevation: 2,
  },
  scrollView: {
    flex: 1,
    padding: 16,
  },
  emptyState: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 40,
  },
  emptyStateText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#666",
    marginBottom: 8,
  },
  emptyStateSubText: {
    fontSize: 14,
    color: "#999",
  },
  noteCard: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 2,
  },
  noteHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 8,
  },
  noteTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
    flex: 1,
  },
  priorityIndicator: {
    width: 12,
    height: 12,
    borderRadius: 6,
    marginLeft: 8,
  },
  categoryText: {
    fontSize: 14,
    color: "#666",
    marginBottom: 8,
    fontStyle: "italic",
  },
  noteContent: {
    fontSize: 14,
    color: "#666",
    marginBottom: 8,
  },
  dateText: {
    fontSize: 12,
    color: "#999",
    textAlign: "right",
  },
  addButton: {
    position: "absolute",
    right: 20,
    bottom: Platform.OS === "ios" ? 40 : 20,
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: "#3949ab",
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  addButtonText: {
    fontSize: 32,
    color: "#fff",
    marginTop: -2,
  },
});

export default HomePage;
