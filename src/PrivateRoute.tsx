import { Navigate } from "react-router-dom";
import { useAuth } from "./context/AuthContext";
import { useSelector } from "react-redux";
import type {RootState} from './app/store'
interface Props {
  children: JSX.Element;
}

const PrivateRoute: React.FC<Props> = ({ children }) => {
  const { user } = useAuth();
  // const token = useSelector((state: RootState) => state.auth.accessToken);

  if (!user.accessToken) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default PrivateRoute;
