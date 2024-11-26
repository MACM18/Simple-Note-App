import React, { createContext, useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";

export const AuthContext = createContext();

const API_URL = "http://localhost:3000/notes"; // Adjust this URL if needed

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState("null");
  const [loading, setLoading] = useState(true);
  const [notes, setNotes] = useState([]);

  useEffect(() => {
    const checkAuthStatus = async () => {
      const storedUser = await AsyncStorage.getItem("user");
      if (storedUser) {
        setUser(JSON.parse(storedUser));
        // fetchUserNotes(JSON.parse(storedUser).username); // Fetch notes for the logged-in user
        fetchUserNotes("user1"); // Fetch notes for the logged-in user
      }
      setLoading(false);
    };

    checkAuthStatus();
  }, []);

  const login = async (userData) => {
    setUser(userData);
    await AsyncStorage.setItem("user", JSON.stringify(userData));
    fetchUserNotes(userData.username); // Fetch notes for the logged-in user
  };

  const logout = async () => {
    setUser(null);
    await AsyncStorage.removeItem("user");
    setNotes([]); // Clear notes on logout
  };

  const fetchUserNotes = async (username) => {
    const response = await axios.get(API_URL);
    const userNotes = response.data.filter(
      (note) => note.username === username
    );
    console.log(userNotes);
    setNotes(userNotes);
  };

  const addNote = async (note) => {
    const response = await axios.post(API_URL, note);
    setNotes([...notes, response.data]);
  };

  const modifyNote = async (id, updatedNote) => {
    const response = await axios.put(`${API_URL}/${id}`, updatedNote);
    setNotes(notes.map((note) => (note.id === id ? response.data : note)));
  };

  const deleteNote = async (id) => {
    await axios.delete(`${API_URL}/${id}`);
    setNotes(notes.filter((note) => note.id !== id));
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        logout,
        notes,
        addNote,
        modifyNote,
        deleteNote,
        loading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
