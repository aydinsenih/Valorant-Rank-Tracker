import { Layout, Menu, Image } from "antd";
import { Link } from "react-router-dom";
import logo from "../images/logo.png";
const { Header: AntHeader } = Layout;
const Header = (props) => {
  const { isLoggedIn } = props;
  return (
    <AntHeader className="header">
      <Link to="/">
        <Image preview={false} width={362} src={logo} alt="logo" />
      </Link>

      {isLoggedIn() ? (
        <Menu theme="dark" mode="horizontal">
          {console.log("icerisi")}
          <Menu.Item key="1">
            <Link to="/logout">
              <span>Logout</span>
            </Link>
          </Menu.Item>
        </Menu>
      ) : (
        ""
      )}
    </AntHeader>
  );
};

export default Header;
