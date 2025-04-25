import { useEffect, useReducer } from "react";
import { AuthContext } from "./AuthContext";

const initialState = {
  user: null,
}; 

function reducer(state, action) {
  switch (action.type) {
    case "LOGIN":
      return { user: action.payload };
    case "LOGOUT":
      return { user: null };
    default:
      return state;
  }
}

export const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState, () => {
    const storedUser = localStorage.getItem("user");
    return { user: storedUser ? JSON.parse(storedUser) : null };
  });

  useEffect(() => {
    if (state.user) {
      localStorage.setItem("user", JSON.stringify(state.user));
    } else {
      localStorage.removeItem("user");
    }
  }, [state.user]);

  const login = (user) => dispatch({ type: "LOGIN", payload: user });
  const logout = () => dispatch({ type: "LOGOUT" });

  return (
    <AuthContext.Provider value={{ user: state.user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
