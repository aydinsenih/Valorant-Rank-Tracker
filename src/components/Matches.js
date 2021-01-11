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
  const img_node = assetsPath("./TX_CompetitiveTier_Large_24.png");
  console.log(img_node);
  return (
    <Layout style={{ backgroundImage: `url('${backgroundim}')` }}>
      {matchData.map((match, index) => {
        if (match.CompetitiveMovement !== "MOVEMENT_UNKNOWN") {
          let progress, status;
          if (match.CompetitiveMovement === "DEMOTED") {
            status = "DEMOTED";
            progress =
              match.TierProgressAfterUpdate -
              match.TierProgressBeforeUpdate -
              100;
          } else if (match.CompetitiveMovement === "PROMOTED") {
            status = "PROMOTED";
            progress =
              100 -
              match.TierProgressBeforeUpdate +
              match.TierProgressAfterUpdate;
          } else {
            progress =
              match.TierProgressBeforeUpdate - match.TierProgressAfterUpdate;
          }
          const mapArray = match.MapID.split("/");
          const map = mapArray[mapArray.length - 1];
          const mapLink = `./${map}.png`;
          return (
            <Card
              style={{
                width: "50%",
                backgroundImage: "url(" + assetsPath(mapLink).default + ")",
                backgroundRepeat: "no-repeat",
                backgroundPosition: "center",
                backgroundSize: "cover",
              }}
              key={index}
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
                <p>
                  {progress > 0 ? (
                    <span style={{ color: "green" }}>+{progress} WIN</span>
                  ) : (
                    <span style={{ color: "red" }}>{progress} LOSE</span>
                  )}
                  {status ? <span className="status">({status})</span> : ""}
                </p>
                <p>{maps[map]}</p>
              </div>
            </Card>
          );
        }
      })}
    </Layout>
  );
};

export default Matches;
