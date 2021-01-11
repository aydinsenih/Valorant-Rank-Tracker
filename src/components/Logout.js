import { Redirect } from "react-router-dom";
import { useEffect } from "react";
const Logout = (props) => {
  const { setUserData } = props;
  useEffect(() => {
    setUserData([]);
    localStorage.clear();
  }, []);
  return <Redirect to="/" />;
};

export default Logout;
