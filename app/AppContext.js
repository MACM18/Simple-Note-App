import { createContext, useState } from "react";
const AuthContext = createContext({});
const TaskContext = createContext();

const AppProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
  const [tasks, setTasks] = useState([
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

  return (
    <AuthContext.Provider
      value={{ isAuthenticated, setIsAuthenticated, user, setUser }}
    >
      <TaskContext.Provider value={{ tasks, setTasks }}>
        {children}
      </TaskContext.Provider>
    </AuthContext.Provider>
  );
};

export { AuthContext, TaskContext, AppProvider };
