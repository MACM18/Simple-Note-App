import { Tabs } from "expo-router";
import { AuthProvider } from "./context/AuthContext";

const _layout = () => {
  return (
    <AuthProvider>
      <Tabs>
        <Tabs.Screen name='index' options={{ title: "Home" }} />
      </Tabs>
    </AuthProvider>
  );
};

export default _layout;
