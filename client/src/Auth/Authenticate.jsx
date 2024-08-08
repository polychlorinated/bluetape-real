import { useHistory } from "react-router-dom";
import { useEffect } from "react";
import api from "../shared/utils/api";
import { getStoredAuthToken, removeStoredAuthToken, removeStoredRefreshToken } from "../shared/utils/authToken";
import { PageLoader } from "../shared/components";

const Authenticate = () => {
  const history = useHistory();

  useEffect(() => {
    const checkAuthStatus = async () => {
      const token = getStoredAuthToken();
      console.log("Stored Auth Token:", token);
      if (!token) {
        history.push("/signIn");
        return;
      }
      try {
        const response = await api.get("/auth");
        console.log("Auth Response:", response);
        if (response.data.user) {
          history.push("/projects");
        } else {
          throw new Error('User not found in response');
        }
      } catch (e) {
        console.error("Auth Check Error:", e);
        removeStoredAuthToken();
        removeStoredRefreshToken();
        history.push("/signIn");
      }
    };
    checkAuthStatus();
  }, [history]);

  return <PageLoader />;
};

export default Authenticate;