import { uiLogout } from "@/app/features/auth/authSlice";
import { useAppDispatch, useAppSelector } from "@/hooks/hook";
import { createContext, useContext } from "react";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const user = useAppSelector((s) => s.auth);
  const dispatch = useAppDispatch();

  const uiSignOut = () => {
    dispatch(uiLogout());
  };

  return (
    <AuthContext.Provider value={{ user ,uiSignOut}}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
