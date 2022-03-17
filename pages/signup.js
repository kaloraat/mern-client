import { useState, useEffect, useContext } from "react";
import { Form, Input, Button, Checkbox } from "antd";
import { MailOutlined, LockOutlined, UserOutlined } from "@ant-design/icons";
import { Row, Col, Typography } from "antd";
import toast from "react-hot-toast";
import { AuthContext } from "../context/auth";
import { useRouter } from "next/router";
import Link from "next/link";
import axios from "axios";

const { Title } = Typography;

const SignUp = () => {
  // context
  const [auth, setAuth] = useContext(AuthContext);
  // hooks
  const router = useRouter();
  // state
  const [loading, setLoading] = useState(false);

  const onFinish = async (values) => {
    // console.log("Success:", values);
    try {
      setLoading(true);
      const { data } = await axios.post(`/signup`, values);
      console.log(data);
      if (data.error) {
        toast.error(data.error);
        setLoading(false);
      } else {
        // save user and token response in context, localstorage then redirect user to dashboard
        setAuth({ user: data.user, token: data.token });
        localStorage.setItem("auth", JSON.stringify(data));
        toast.success("Successfully registered");
        setLoading(false);
        // router.push("/");
        if (data?.user?.role === "Admin") {
          router.push("/admin");
        } else {
          router.push("/");
        }
      }
    } catch (err) {
      toast.error("Signup failed. Try again.");
      console.log(err);
      setLoading(false);
    }
  };

  return (
    <Row>
      <Col span={12} offset={6} style={{ paddingTop: "10%" }}>
        <Title>Sign Up</Title>

        <Form onFinish={onFinish}>
          <Form.Item
            name="name"
            rules={[
              {
                required: true,
                message: "Please enter your name!",
              },
            ]}
            hasFeedback
          >
            <Input prefix={<UserOutlined />} placeholder="Name" />
          </Form.Item>
          <Form.Item
            name="email"
            rules={[
              {
                type: "email",
                message: "The input is not valid E-mail!",
              },
              {
                required: true,
                message: "Please input your E-mail!",
              },
            ]}
            hasFeedback
          >
            <Input prefix={<MailOutlined />} placeholder="Email" />
          </Form.Item>
          <Form.Item
            name="password"
            rules={[
              {
                required: true,
                message: "Please input your password!",
                min: 6,
                max: 24,
              },
            ]}
            hasFeedback
          >
            <Input.Password
              prefix={<LockOutlined />}
              type="password"
              placeholder="Password"
            />
          </Form.Item>

          <Form.Item
            name="confirm"
            dependencies={["password"]}
            hasFeedback
            rules={[
              {
                required: true,
                message: "Please confirm your password!",
              },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue("password") === value) {
                    return Promise.resolve();
                  }

                  return Promise.reject(
                    new Error(
                      "The two passwords that you entered do not match!"
                    )
                  );
                },
              }),
            ]}
          >
            <Input.Password
              prefix={<LockOutlined />}
              placeholder="Confirm Password"
            />
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" loading={loading}>
              Sign Up
            </Button>
            <br /> Or{" "}
            <Link href="/signin">
              <a>Login!</a>
            </Link>
          </Form.Item>
        </Form>
      </Col>
    </Row>
  );
};

export default SignUp;
