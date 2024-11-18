import LoginScreen from ".";
import RegisterScreen from "./register";
import { Tabs } from "expo-router";

const _layout = () => {
  return (
    <Tabs>
      <Tabs.Screen name='index' options={{ title: "Home" }} />
      <Tabs.Screen name='register' />
      <Tabs.Screen name='Weather' />
    </Tabs>
  );
};

export default _layout;
