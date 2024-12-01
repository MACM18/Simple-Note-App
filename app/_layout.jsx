import { Tabs } from "expo-router";
import { AuthProvider } from "./context/AuthContext";
import FontAwesome from "@expo/vector-icons/FontAwesome";

const _layout = () => {
  return (
    <AuthProvider>
      <Tabs>
        <Tabs.Screen
          name='Screens/HomePage'
          options={{
            headerShown: false,
            title: "Home",
            tabBarIcon: ({ color }) => (
              <FontAwesome size={28} name='home' color={color} />
            ),
          }}
        />
        <Tabs.Screen
          name='Screens/Weather'
          options={{
            headerShown: false,
            title: "Weather",
            tabBarIcon: ({ color }) => (
              <FontAwesome size={28} name='cloud' color={color} />
            ),
          }}
        />
        <Tabs.Screen
          name='Screens/AddNote'
          options={{
            headerShown: false,
            title: "New",
            tabBarIcon: ({ color }) => (
              <FontAwesome size={28} name='plus' color={color} />
            ),
          }}
        />
        <Tabs.Screen
          name='index'
          options={{ tabBarItemStyle: { display: "none" } }}
        />
        <Tabs.Screen
          name='Screens/LoginPage'
          options={{ tabBarItemStyle: { display: "none" } }}
        />
        <Tabs.Screen
          name='Screens/RegistrationPage'
          options={{ tabBarItemStyle: { display: "none" } }}
        />
        <Tabs.Screen
          name='Screens/Note/[id]'
          options={{ tabBarItemStyle: { display: "none" } }}
        />
        <Tabs.Screen
          name='Screens/Note/Edit/[id]'
          options={{ tabBarItemStyle: { display: "none" } }}
        />
      </Tabs>
    </AuthProvider>
  );
};

export default _layout;
