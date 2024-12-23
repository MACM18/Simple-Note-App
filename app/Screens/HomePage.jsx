// Full Note Application Code
// Required dependencies: React Native, Expo, React Navigation, Context API, AsyncStorage

// Install required packages before running this code:
// npm install @react-navigation/native @react-navigation/stack react-native-screens react-native-safe-area-context react-native-gesture-handler react-native-reanimated expo-splash-screen expo-constants expo-font

// App.js
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { NotesProvider } from './context/NotesContext';
import LoginScreen from './screens/LoginScreen';
import RegisterScreen from './screens/RegisterScreen';
import HomeScreen from './screens/HomeScreen';
import AddNoteScreen from './screens/AddNoteScreen';
import ViewNoteScreen from './screens/ViewNoteScreen';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NotesProvider>
      <NavigationContainer>
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          <Stack.Screen name="Login" component={LoginScreen} />
          <Stack.Screen name="Register" component={RegisterScreen} />
          <Stack.Screen name="Home" component={HomeScreen} />
          <Stack.Screen name="AddNote" component={AddNoteScreen} />
          <Stack.Screen name="ViewNote" component={ViewNoteScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </NotesProvider>
  );
}

// context/NotesContext.js
import React, { createContext, useState } from 'react';

export const NotesContext = createContext();

export const NotesProvider = ({ children }) => {
  const [users, setUsers] = useState([]); // Stores user details
  const [currentUser, setCurrentUser] = useState(null); // Currently logged-in user
  const [notes, setNotes] = useState([]); // Stores notes

  return (
    <NotesContext.Provider value={{ users, setUsers, currentUser, setCurrentUser, notes, setNotes }}>
      {children}
    </NotesContext.Provider>
  );
};

// screens/LoginScreen.js
import React, { useContext, useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { NotesContext } from '../context/NotesContext';

export default function LoginScreen({ navigation }) {
  const { users, setCurrentUser } = useContext(NotesContext);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    const user = users.find((u) => u.username === username && u.password === password);
    if (user) {
      setCurrentUser(user);
      navigation.navigate('Home');
    } else {
      Alert.alert('Error', 'Invalid username or password');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login</Text>
      <TextInput
        style={styles.input}
        placeholder="Username"
        value={username}
        onChangeText={setUsername}
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />
      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>Login</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate('Register')}>
        <Text style={styles.link}>Don’t have an account? Register</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    width: '80%',
    padding: 10,
    marginVertical: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    backgroundColor: '#fff',
  },
  button: {
    backgroundColor: '#4CAF50',
    padding: 10,
    borderRadius: 5,
    marginVertical: 10,
    width: '80%',
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  link: {
    color: '#007BFF',
    marginTop: 10,
  },
});

// Remaining Screens (RegisterScreen.js, HomeScreen.js, AddNoteScreen.js, ViewNoteScreen.js) will follow a similar structure with styles and animations included.

// Let me know if you want the rest of the screens completed in this file or provided separately!
