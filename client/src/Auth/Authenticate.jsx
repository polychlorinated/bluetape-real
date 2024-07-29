import { useHistory } from "react-router-dom";
import { useEffect } from "react";
import api from "../shared/utils/api";
import { getStoredAuthToken, setStoredAuthToken } from "../shared/utils/authToken";
import { PageLoader } from "../shared/components";

const Authenticate = () => {
  const history = useHistory();

  useEffect(() => {
    const checkAuthStatus = async () => {
      const token = getStoredAuthToken();
      console.log("Stored Auth Token:", token);
      if (!token) {
        history.push("/signin");
        return;
      }
      try {
        const response = await api.get("/auth");
        console.log("Auth Response:", response);
        const { tokens } = response;
        if (tokens && tokens.access && tokens.access.token) {
          setStoredAuthToken(tokens.access.token);
          const userResponse = await api.get("/user", {
            headers: { Authorization: `Bearer ${tokens.access.token}` }
          });
          console.log("User Response:", userResponse);
          const { user } = userResponse;
          if (user) {
            history.push("/projects");
          } else {
            history.push("/signin");
          }
        } else {
          history.push("/signin");
        }
      } catch (e) {
        console.error("Auth Check Error:", e);
        history.push("/signin");
      }
    };
    checkAuthStatus();
  }, [history]);

  return <PageLoader />;
};

export default Authenticate;