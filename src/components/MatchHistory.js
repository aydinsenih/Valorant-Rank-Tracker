import { useState, useEffect } from "react";
import axios from "axios";
import React, { Suspense } from "react";
import { Button } from "antd";
import backgroundim from "../images/valbg.png";
const Matches = React.lazy(() => import("./Matches"));

const MatchHistory = (props) => {
  const [matchData, setMatchData] = useState([]);
  const { userData } = props;

  function getMatchData() {
    var data = {
      user_token: localStorage.getItem("user_token"), //userData.user_token,
      entitlements_token: localStorage.getItem("entitlements_token"), //userData.entitlements_token,
      sub: localStorage.getItem("sub"), //userData.sub,
      region: localStorage.getItem("region"), //userData.region
    };
    var config = {
      method: "post",
      url: "https://valtrackerbe.herokuapp.com/getuserhistory",
      headers: {
        "Content-Type": "application/json",
      },
      data: data,
    };

    axios(config)
      .then((response) => {
        console.log(response);
        setMatchData(
          response.data.data.Matches.filter(
            (match) => match.CompetitiveMovement !== "MOVEMENT_UNKNOWN"
          )
        );
      })
      .catch((error) => console.error(error));
  }

  const handleClick = (evt) => {
    getMatchData();
  };

  useEffect(() => {
    getMatchData();
  }, []);

  return matchData.length > 0 ? (
    <div
      className="match-history-div"
      style={{
        backgroundImage: `url('${backgroundim}')`,
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
        backgroundSize: "cover",
      }}
    >
      <h1>
        {userData.game_name}#{userData.tag_line}
      </h1>
      <h1>
        Current LP {matchData[0].TierProgressAfterUpdate} / Current MMR{" "}
        {matchData[0].TierAfterUpdate * 100 -
          300 +
          matchData[0].TierProgressAfterUpdate}
      </h1>
      <Button type="primary" onClick={handleClick}>
        Refresh
      </Button>
      <Suspense fallback={<div>Loading data...</div>}>
        <Matches matchData={matchData} />
      </Suspense>
    </div>
  ) : (
    <div>Loading match data...</div>
  );
};

export default MatchHistory;
