import { useState, useEffect } from "react";
import axios from "axios";
import React, { Suspense } from "react";
import backgroundim from "../images/valbg.png";
const Matches = React.lazy(() => import("./Matches"));

const MatchHistory = (props) => {
  const [matchData, setMatchData] = useState([]);
  const { userData } = props;

  useEffect(() => {
    //console.log({ userData });
    var data = JSON.stringify({
      user_token: localStorage.getItem("user_token"), //userData.user_token,
      entitlements_token: localStorage.getItem("entitlements_token"), //userData.entitlements_token,
      sub: localStorage.getItem("sub"), //userData.sub,
    });
    var config = {
      method: "post",
      url: "http://localhost:4000/getuserhistory",
      headers: {
        "Content-Type": "application/json",
      },
      data: data,
    };

    axios(config)
      .then((response) => {
        setMatchData(
          response.data.data.Matches.filter(
            (match) => match.CompetitiveMovement !== "MOVEMENT_UNKNOWN"
          )
        );
      })
      .catch((error) => console.error(error));
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
      {console.log(matchData)}
      <h1>{userData.game_name}</h1>
      <h1>
        Current LP {matchData[0].TierProgressAfterUpdate} / Current MMR{" "}
        {matchData[0].TierAfterUpdate * 100 -
          300 +
          matchData[0].TierProgressAfterUpdate}
      </h1>
      <Suspense fallback={<div>Loading data...</div>}>
        <Matches matchData={matchData} />
        {/* <div>{JSON.stringify(matchData)}</div> */}
      </Suspense>
    </div>
  ) : (
    <div>Loading...</div>
  );
};

export default MatchHistory;
