import {
  createContext,
  useContext,
  useState,
} from "react";

interface AuthContextData {
  token: object;
  setToken(token: string): void;
  removeToken(): void
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

export const AuthProvider = ({ children }: any) => {
  const [data, setData] = useState<any | any>(localStorage.getItem("token") || "");

  const setToken = (token: string) => {
    localStorage.setItem("token", token);
    setData(token);
  };

  const removeToken = () => {
    localStorage.removeItem("token");
    setData(null);
  }

  return (
    <AuthContext.Provider value={{ token: data, setToken: setToken, removeToken: removeToken }}>
      {children}
    </AuthContext.Provider>
  );
};

export function useAuth(): AuthContextData {
  const context = useContext(AuthContext);

  return context;
}
