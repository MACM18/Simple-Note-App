import React, { createContext, useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";

export const AuthContext = createContext();

const API_URL = "http://localhost:3000/notes"; // Updated API URL

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState("");
  const [loading, setLoading] = useState(true);
  const [notes, setNotes] = useState([]);
  const [users, setUsers] = useState([
    {
      username: "admin",
      password: "admin",
    },
  ]);
  const [alert, setAlert] = useState(false);

  useEffect(() => {
    const checkAuthStatus = async () => {
      const storedUser = await AsyncStorage.getItem("user");
      if (storedUser) {
        setUser(JSON.parse(storedUser));
        fetchUserNotes(JSON.parse(storedUser).username); // Fetch notes for the logged-in user
      }
      setLoading(false);
    };

    checkAuthStatus();
  }, []);

  const register = (username, password) => {
    // Check if the user already exists
    const existingUser = users.find((user) => user.username === username);
    if (existingUser) {
      throw new Error("User  already exists");
    }
    // Add the new user to the users array
    const newUser = { username, password };
    setUsers([...users, newUser]);
  };

  const login = (username, password) => {
    console.log(users);
    // Check if the username and password match any user in the users state
    const existingUser = users.find(
      (user) => user.username === username && user.password === password
    );
    if (existingUser) {
      setUser(existingUser);
      AsyncStorage.setItem("user", JSON.stringify(existingUser));
      fetchUserNotes(existingUser.username); // Fetch notes for the logged-in user
    } else {
      throw new Error("Invalid username or password");
    }
  };

  const logout = async () => {
    setUser(null);
    await AsyncStorage.removeItem("user");
    setNotes([]); // Clear notes on logout
  };

  const fetchUserNotes = async (username) => {
    const response = await axios.get(`${API_URL}/${username}`); // Fetch notes by username
    // const response = await axios.get(`${API_URL}`); // Fetch notes by username
    setNotes(response.data);
    console.log(`${API_URL}/${username}`);
  };

  const fetchNotes = async () => {
    if (user) {
      await fetchUserNotes(user.username); // Fetch notes for the current user
    }
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
        register,
        login,
        logout,
        notes,
        addNote,
        modifyNote,
        deleteNote,
        loading,
        alert,
        setAlert,
        fetchNotes,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
