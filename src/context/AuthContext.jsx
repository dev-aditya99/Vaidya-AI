import { createContext, useContext, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useLocation } from "react-router-dom";

export const AuthContext = createContext();

export const useAuthContext = () => {
  return useContext(AuthContext);
};

export const AuthContextProvider = ({ children }) => {
  // useLocation
  const location = useLocation();

  // states
  const [authUser, setAuthUser] = useState(
    JSON.parse(localStorage.getItem("user") || true)
  );
  const [geminiResponse, setGeminiResponse] = useState(null);

  // user's location
  const [geoLocation, setGeoLocation] = useState(
    JSON.parse(localStorage.getItem("geoLocation"))
  );

  // get path
  const [currentPath, setCurrentPath] = useState(location.pathname);

  //   url and paths
  const backendBaseURL =
    import.meta.env.VITE_BACKEND_URL || "http://localhost:8000";
  const authBaseUrl = backendBaseURL + import.meta.env.VITE_USER_AUTH_PATH;

  // useEffects
  useEffect(() => {
    setCurrentPath(location.pathname);
  }, [location.pathname]);

  useEffect(() => {
    getLocation();
  }, []);

  // function
  const getLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setGeoLocation({
            lat: position.coords.latitude,
            lon: position.coords.longitude,
          });

          // set it to the localStorage
          localStorage.setItem(
            "geoLocation",
            JSON.stringify({
              lat: position.coords.latitude,
              lon: position.coords.longitude,
            })
          );
        },
        (error) => {
          toast.error("Location error:", error.message);
        }
      );
    } else {
      toast.error("Geolocation is not supported by your browser.");
    }
  };

  return (
    <AuthContext.Provider
      value={{
        backendBaseURL,
        authBaseUrl,
        authUser,
        setAuthUser,
        geminiResponse,
        setGeminiResponse,
        currentPath,
        setCurrentPath,
        geoLocation,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
