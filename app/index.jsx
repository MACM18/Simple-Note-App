import { AppProvider } from "./AppContext";
import LoginComponent from "../components/LoginComponent";

const Home = () => {
  return (
    <AppProvider>
      <LoginComponent />
    </AppProvider>
  );
};

export default Home;
