import { Card, Layout, Image } from "antd";
import backgroundim from "../images/trackerbg.png";

const Matches = (props) => {
  const maps = {
    Triad: "Haven",
    Port: "Icebox",
    Bonsai: "Split",
    Duality: "Bind",
    Ascent: "Ascent",
  };
  const { matchData } = props;
  if (!matchData) {
    return <div>waiting for match data</div>;
  }
  let assetsPath = require.context("../images", true, /\.(png|jpe?g|svg)$/);
  // style={{ backgroundImage: `url('${backgroundim}')` }}
  return (
    <Layout style={{ backgroundImage: `url('${backgroundim}')` }}>
      {matchData.map((match, index) => {
        if (match.CompetitiveMovement !== "MOVEMENT_UNKNOWN") {
          let progress;
          if (match.CompetitiveMovement === "DEMOTED") {
            progress =
              match.TierProgressAfterUpdate -
              match.TierProgressBeforeUpdate -
              100;
          } else if (match.CompetitiveMovement === "PROMOTED") {
            progress =
              100 -
              match.TierProgressBeforeUpdate +
              match.TierProgressAfterUpdate;
          } else {
            progress =
              match.TierProgressAfterUpdate - match.TierProgressBeforeUpdate;
          }
          const mapArray = match.MapID.split("/");
          const map = mapArray[mapArray.length - 1];
          const mapLink = `./${map}.png`;
          const bgColor = progress > 0 ? "#a3cfec" : "#e2b6b3";
          return (
            <Card
              style={{
                width: "50%",
                backgroundColor: bgColor,
                // backgroundImage: "url(" + assetsPath(mapLink).default + ")",
                // backgroundRepeat: "no-repeat",
                // backgroundPosition: "center",
                // backgroundSize: "cover",
              }}
              bordered={false}
              key={match.MatchStartTime}
            >
              <div className="card-div">
                <Image
                  preview={false}
                  width={50}
                  src={
                    assetsPath(
                      `./TX_CompetitiveTier_Large_${match.TierAfterUpdate}.png`
                    ).default
                  }
                />
                <div>
                  {progress > 0 ? (
                    <span style={{ color: "green" }}>+{progress} LP </span>
                  ) : (
                    <span style={{ color: "red" }}>{progress} LP </span>
                  )}
                  {/* {status ? <span className="status">({status})</span> : ""} */}
                  <Image
                    preview={false}
                    width={15}
                    src={
                      assetsPath(
                        `./TX_CompetitiveTierMovement_${match.CompetitiveMovement}.png`
                      ).default
                    }
                  />
                </div>
              </div>
              <div className="card-div-second">
                <Image
                  preview={false}
                  src={assetsPath(`./${map}.png`).default}
                ></Image>
                <div className="map-name">{maps[map]}</div>
              </div>
            </Card>
          );
        }
      })}
    </Layout>
  );
};

export default Matches;
