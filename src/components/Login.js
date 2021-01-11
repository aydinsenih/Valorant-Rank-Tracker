import { Form, Input, Button, Row, Alert } from "antd";
import axios from "axios";
import { useHistory } from "react-router-dom";
import { useState, useEffect } from "react";
import { UserOutlined, LockOutlined } from "@ant-design/icons";

const Login = (props) => {
  const { setUserData, isLoggedIn } = props;
  const history = useHistory();

  const [loginError, setLoginError] = useState("");

  useEffect(() => {
    const loginData = isLoggedIn();
    console.log(loginData);
    if (loginData) {
      login(loginData);
    }
  }, []);

  const login = (loginDetails) => {
    const data = JSON.stringify({
      username: loginDetails.username,
      password: loginDetails.password,
    });
    var config = {
      method: "post",
      url: "http://localhost:4000/getuserinfo",
      headers: {
        "Content-Type": "application/json",
      },
      data: data,
    };
    axios(config)
      .then((res) => {
        setUserData(res.data.response);
        localStorage.setItem("user_token", res.data.response.user_token);
        localStorage.setItem(
          "entitlements_token",
          res.data.response.entitlements_token
        );
        localStorage.setItem("sub", res.data.response.sub);
        localStorage.setItem("username", loginDetails.username);
        localStorage.setItem("password", loginDetails.password);
        history.push("/matchhistory");
      })
      .catch((err) => setLoginError("Username and Password is incorrect!"));
  };

  const onChange = (evt) => {};

  const onSubmit = (values) => {
    login(values);
  };
  const formItemLayout = {
    labelCol: {
      lg: {
        span: 8,
      },
      xs: {
        span: 24,
      },
      sm: {
        span: 8,
      },
    },
    wrapperCol: {
      lg: {
        span: 16,
      },
      xs: {
        span: 16,
      },
      sm: {
        span: 16,
      },
    },
  };
  const tailFormItemLayout = {
    wrapperCol: {
      lg: {
        span: 15,
        offset: 4,
      },
      xs: {
        span: 12,
        offset: 0,
      },
      sm: {
        span: 12,
        offset: 4,
      },
    },
  };

  return (
    <Row type="flex" justify="center" align="middle">
      <Form
        {...formItemLayout}
        className="forms"
        name="login"
        onFinish={onSubmit}
      >
        <h1>Welcome Back</h1>
        {loginError && (
          <Alert
            style={{ marginBottom: 24 }}
            message={loginError}
            type="error"
            showIcon
            closable
          />
        )}
        <Form.Item
          name="username"
          rules={[
            {
              required: true,
              message: "please input your username!",
            },
          ]}
        >
          <Input
            name="username"
            placeholder="username"
            onChange={onChange}
            prefix={<UserOutlined />}
          />
        </Form.Item>
        <Form.Item
          name="password"
          rules={[
            {
              required: true,
              message: "please input your password!",
            },
          ]}
          hasFeedback
        >
          <Input.Password
            name="password"
            onChange={onChange}
            placeholder="password"
            prefix={<LockOutlined />}
          />
        </Form.Item>
        <Form.Item {...tailFormItemLayout}>
          <Button type="primary" htmlType="submit">
            Login
          </Button>
        </Form.Item>
      </Form>
    </Row>
  );
};

export default Login;
