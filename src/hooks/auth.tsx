import {
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";
import { useNavigate } from "react-router-dom";
import { setupInterceptors } from "../services/api";

interface AuthContextData {
  token: object;
  isOpenSidebar: boolean;
  setToken(token: string): void;
  removeToken(): void
  handleOpenSidebar():void
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

export const AuthProvider = ({ children }: any) => {
  const [data, setData] = useState<any | any>(localStorage.getItem("token") || "");
  const [openSidebar, setOpenSidebar] = useState<boolean>(false);
  const navigate = useNavigate();
  const setToken = (token: string) => {
    localStorage.setItem("token", token);
    setData(token);
  };

  const removeToken = () => {
    localStorage.removeItem("token");
    setData(null);
    navigate("/signin")
  }

  const handleOpenSidebar = () => {
    setOpenSidebar(!openSidebar);
  }

  useEffect(() => {
    setupInterceptors(removeToken);
  }, [removeToken]);

  return (
    <AuthContext.Provider value={{ token: data, isOpenSidebar: openSidebar, setToken, removeToken, handleOpenSidebar }}>
      {children}
    </AuthContext.Provider>
  );
};

export function useAuth(): AuthContextData {
  const context = useContext(AuthContext);

  return context;
}
