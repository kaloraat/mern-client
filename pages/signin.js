import { useState, useEffect, useContext } from "react";
import { Row, Col, Typography, Form, Input, Button, Divider } from "antd";
import { MailOutlined, LockOutlined, UserOutlined } from "@ant-design/icons";
import toast from "react-hot-toast";
import { AuthContext } from "../context/auth";
import { useRouter } from "next/router";
import Link from "next/link";
import axios from "axios";

const { Title, Text, Paragraph } = Typography;

const SignIn = () => {
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
      const { data } = await axios.post(`/signin`, values);
      console.log(data);
      if (data.error) {
        toast.error(data.error);
        setLoading(false);
      } else {
        // save user and token response in context, localstorage then redirect user to dashboard
        setAuth({ user: data.user, token: data.token });
        localStorage.setItem("auth", JSON.stringify(data));
        toast.success("Successfully logged in");
        setLoading(false);
        if (data.user?.role === "Admin") {
          router.push("/admin");
        } else if (data.user?.role === "Author") {
          router.push("/author");
        } else {
          router.push("/subscriber");
        }
      }
    } catch (err) {
      toast.error("SignIn failed. Try again.");
      console.log(err);
      setLoading(false);
    }
  };

  return (
    <Row>
      <Col span={12} offset={6} style={{ paddingTop: "10%" }}>
        <Title>Sign In</Title>

        <div
          style={{
            border: "2px dashed",
            marginBottom: "24px",
            padding: "10px 10px 0px 10px",
            borderRadius: "10px",
          }}
        >
          <Text disabled>Login as Author (email/password)</Text>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            <Paragraph copyable>author@gmail.com</Paragraph>
            <Paragraph copyable>aaaaaa</Paragraph>
          </div>

          <hr style={{ border: "1px dashed" }} />

          <Text disabled>Login as Subscriber (email/password)</Text>
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <Paragraph copyable>subscriber@gmail.com</Paragraph>
            <Paragraph copyable>ssssss</Paragraph>
          </div>
        </div>

        <Form
          initialValues={{
            email: "admin@gmail.com",
            password: "aaaaaa",
          }}
          onFinish={onFinish}
        >
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

          <Form.Item>
            <Link href="/forgot-password">
              <a>Forgot password</a>
            </Link>
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" loading={loading}>
              Sign In
            </Button>
            <br /> Or{" "}
            <Link href="/signup">
              <a>Register now!</a>
            </Link>
          </Form.Item>
        </Form>
      </Col>
    </Row>
  );
};

export default SignIn;
