import React, { Suspense } from "react";
import { Layout } from "antd";
import { Route } from "react-router-dom";
import { useState } from "react";
import Login from "./components/Login";
import Header from "./components/Header";
import Logout from "./components/Logout";
const MatchHistory = React.lazy(() => import("./components/MatchHistory"));

function isLoggedIn() {
  const username = localStorage.getItem("username");
  const password = localStorage.getItem("password");
  if (username && password) {
    return { username: username, password: password };
  }
  return false;
}

function App() {
  const [userData, setUserData] = useState([]);

  return (
    <Layout>
      <Header isLoggedIn={isLoggedIn} />
      <Route exact path="/">
        <Login setUserData={setUserData} isLoggedIn={isLoggedIn} />
      </Route>
      <Route exact path="/matchhistory">
        <Suspense fallback={<div>Loading...</div>}>
          <MatchHistory userData={userData} />
        </Suspense>
      </Route>
      <Route exact path="/logout">
        <Logout setUserData={setUserData} />
      </Route>
    </Layout>
  );
}

export default App;
