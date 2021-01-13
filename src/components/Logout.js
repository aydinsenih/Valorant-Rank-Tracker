import { Redirect } from "react-router-dom";
import { useEffect } from "react";
const Logout = (props) => {
  const { setUserData, setIsLogged } = props;
  useEffect(() => {
    setUserData([]);
    setIsLogged({});
    localStorage.clear();
  }, []);
  return <Redirect to="/" />;
};

export default Logout;
