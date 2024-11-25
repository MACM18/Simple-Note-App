// context/AuthContext.js
import React, { createContext, useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [notes, setNotes] = useState([
    {
      id: 1,
      title: "Task 1",
      description: "This is task 1",
      status: "Not Started",
    },
    {
      id: 2,
      title: "Task 2",
      description: "This is task 2",
      status: "In Progress",
    },
    {
      id: 3,
      title: "Task 3",
      description: "This is task 3",
      status: "Completed",
    },
  ]);

  useEffect(() => {
    const checkAuthStatus = async () => {
      const storedUser = await AsyncStorage.getItem("user");
      if (storedUser) {
        setUser(JSON.parse(storedUser));
      }
      setLoading(false);
    };

    checkAuthStatus();
  }, []);

  //   const login = (username) => {
  //     setUser({ username });
  //   };
  //   const logout = () => {
  //     setUser(null);
  //   };
  const login = async (userData) => {
    setUser(userData);
    await AsyncStorage.setItem("user", JSON.stringify(userData));
  };
  const logout = async () => {
    setUser(null);
    await AsyncStorage.removeItem("user");
  };

  const addNote = (note) => {
    setNotes([...notes, note]);
  };

  const modifyNote = (id, updatedNote) => {
    setNotes(notes.map((note) => (note.id === id ? updatedNote : note)));
  };

  const deleteNote = (id) => {
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
