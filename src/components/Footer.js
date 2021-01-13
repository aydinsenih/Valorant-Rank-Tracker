import { Layout } from "antd";
const { Footer: AntFooter } = Layout;
const Footer = () => {
  return (
    <AntFooter>
      <a
        href="https://github.com/aydinsenih/Valorant-Rank-Tracker"
        target="_blank"
        rel="noreferrer"
      >
        ValTracker Github
      </a>
      {", "}
      <a
        href="https://github.com/aydinsenih/Valorant-Rank-Tracker-be"
        target="_blank"
        rel="noreferrer"
      >
        ValTracker API Github
      </a>{" "}
      Thanks to{" "}
      <a
        href="https://github.com/RumbleMike/ValorantClientAPI"
        target="_blank"
        rel="noreferrer"
      >
        @RumbleMike
      </a>{" "}
      for API. Made by{" "}
      <a href="https://github.com/aydinsenih" target="_blank" rel="noreferrer">
        Senih Aydin{" "}
      </a>
      VALTRACKER &copy; 2021
    </AntFooter>
  );
};

export default Footer;
