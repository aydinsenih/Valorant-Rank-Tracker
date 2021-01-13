import React, { Suspense, useEffect } from "react";
import { Layout } from "antd";
import { Route } from "react-router-dom";
import { useState } from "react";
import Login from "./components/Login";
import Header from "./components/Header";
import Logout from "./components/Logout";
import Footer from "./components/Footer";
const MatchHistory = React.lazy(() => import("./components/MatchHistory"));

function isLoggedIn() {
  const username = localStorage.getItem("username");
  const password = localStorage.getItem("password");
  const region = localStorage.getItem("region");
  if (username && password && region) {
    return { username: username, password: password, region: region };
  }
  return false;
}

function App() {
  const [userData, setUserData] = useState([]);
  const [isLogged, setIsLogged] = useState(false);

  useEffect(() => {
    const logged = isLoggedIn();
    if (logged) {
      console.log(logged);
      setIsLogged(logged);
    }
  }, [userData]);

  return (
    <Layout>
      <Header isLoggedIn={isLogged} />
      <Route exact path="/">
        <Login setUserData={setUserData} isLoggedIn={isLogged} />
      </Route>
      <Route exact path="/matchhistory">
        <Suspense fallback={<div>Loading...</div>}>
          <MatchHistory userData={userData} />
        </Suspense>
      </Route>
      <Route exact path="/logout">
        <Logout setUserData={setUserData} setIsLogged={setIsLogged} />
      </Route>
      <Footer />
    </Layout>
  );
}

export default App;
