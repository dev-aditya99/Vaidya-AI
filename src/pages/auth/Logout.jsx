import React, { useEffect } from "react";
import useLogout from "../../Hooks/useLogout";
import CommonLoader2 from "../../components/loaders/CommonLoader2";

const Logout = () => {
  const { loading, logoutUser } = useLogout();

  useEffect(() => {
    logoutUser;
  }, [location.pathname]);
  return (
    <div className="w-full h-full flex items-center justify-center gap-2">
      Logging Out
      <CommonLoader2 />
    </div>
  );
};

export default Logout;
