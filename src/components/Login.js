import { Form, Input, Button, Row, Alert, Select } from "antd";
import axios from "axios";
import { useHistory } from "react-router-dom";
import { useState, useEffect, useCallback } from "react";
import { UserOutlined, LockOutlined } from "@ant-design/icons";

const Login = (props) => {
  const { setUserData, isLoggedIn } = props;
  const history = useHistory();

  const [loginError, setLoginError] = useState("");

  useEffect(() => {
    if (isLoggedIn) {
      login(isLoggedIn);
    }
  }, [isLoggedIn]);

  const login = useCallback((loginDetails) => {
    const data = {
      username: loginDetails.username,
      password: loginDetails.password,
    };
    var config = {
      method: "post",
      url: "https://valtrackerbe.herokuapp.com/getuserinfo",
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
        localStorage.setItem("region", loginDetails.region);
        history.push("/matchhistory");
      })
      .catch((err) => setLoginError("Username and Password is incorrect!"));
  }, []);

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
        offset: 0,
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

  return isLoggedIn === {} || isLoggedIn === false ? (
    <Row type="flex" justify="center" align="middle">
      <Form
        {...formItemLayout}
        className="forms"
        name="login"
        onFinish={onSubmit}
      >
        <h1>Welcome to ValTracker</h1>
        <Alert
          style={{ marginBottom: 24 }}
          message="Valorant Rank Tracker(aka. ValTracker) does NOT and will NOT store any of your data."
          type="info"
          showIcon
        />
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
        <Form.Item
          name="region"
          rules={[
            {
              required: true,
              message: "please select your region!",
            },
          ]}
        >
          <Select style={{ width: 120 }}>
            <Select.Option value="NA">North America</Select.Option>
            <Select.Option value="EU">Europe</Select.Option>
            <Select.Option value="AP">Asia Pacific</Select.Option>
            <Select.Option value="KO">Korea</Select.Option>
          </Select>
        </Form.Item>
        <Form.Item {...tailFormItemLayout}>
          <Button type="primary" htmlType="submit">
            Login
          </Button>
        </Form.Item>
      </Form>
    </Row>
  ) : (
    <h1>Loading... Please Wait...</h1>
  );
};

export default Login;
