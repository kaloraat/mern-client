import { useState, useEffect, useContext } from "react";
import { Form, Input, Button, Checkbox } from "antd";
import { MailOutlined, LockOutlined, UserOutlined } from "@ant-design/icons";
import { Row, Col, Typography } from "antd";
import toast from "react-hot-toast";
import { useRouter } from "next/router";
import Link from "next/link";
import axios from "axios";

const { Title } = Typography;

const ForgotPassword = () => {
  // hooks
  const router = useRouter();
  const [form] = Form.useForm();
  // state
  const [loading, setLoading] = useState(false);
  const [visible, setVisible] = useState(false);

  const forgotPasswordRequest = async (values) => {
    try {
      setLoading(true);

      const { data } = await axios.post("/forgot-password", values);
      console.log(data);
      if (data.error) {
        toast.error(data.error);
        setLoading(false);
      } else {
        toast.success("Check your email. The request code is sent.");
        setVisible(true);
        setLoading(false);
      }
    } catch (err) {
      toast.error("ForgotPassword failed. Try again.");
      console.log(err);
      setLoading(false);
    }
  };

  const resetPasswordRequest = async (values) => {
    try {
      setLoading(true);

      const { data } = await axios.post("/reset-password", values);
      console.log(data);
      if (data.error) {
        toast.error(data.error);
        setLoading(false);
      } else {
        toast.success(
          "Password successfully changed. Please login with new password"
        );
        // clear form fields using ant form hook
        form.resetFields(["email"]);
        setVisible(false);
        setLoading(false);
        // redirect
        setTimeout(() => {
          router.push("/signin");
        }, 3000);
      }
    } catch (err) {
      toast.error("ForgotPassword failed. Try again.");
      console.log(err);
      setLoading(false);
    }
  };

  return (
    <Row>
      <Col span={12} offset={6} style={{ paddingTop: "10%" }}>
        <Title>Forgot Password</Title>

        <Form
          form={form}
          onFinish={visible ? resetPasswordRequest : forgotPasswordRequest}
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

          {/* if visible true, show password and resetCode input fields */}
          {visible && (
            <>
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
                name="resetCode"
                rules={[
                  {
                    required: true,
                    message: "Please enter reset code!",
                  },
                ]}
                hasFeedback
              >
                <Input prefix={<LockOutlined />} placeholder="Reset code" />
              </Form.Item>
            </>
          )}

          <Form.Item>
            <Button type="primary" htmlType="submit" loading={loading}>
              Submit
            </Button>
            <br /> Or{" "}
            <Link href="/signin">
              <a>Login</a>
            </Link>
          </Form.Item>
        </Form>
      </Col>
    </Row>
  );
};

export default ForgotPassword;
