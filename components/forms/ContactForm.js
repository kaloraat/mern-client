import { useState } from "react";
import { Form, Input, Button } from "antd";
import { UserOutlined, MailOutlined, MessageOutlined } from "@ant-design/icons";
import toast from "react-hot-toast";
import axios from "axios";
import { useRouter } from "next/router";

const Contact = () => {
  // state
  const [loading, setLoading] = useState(false);
  // hooks
  const router = useRouter();
  const [form] = Form.useForm();

  const onFinish = async (values) => {
    console.log("Success:", values);
    try {
      setLoading(true);
      const { data } = await axios.post(`/contact`, values);
      console.log(data);
      if (data.error) {
        toast.error(data.error);
        setLoading(false);
      } else {
        toast.success("Your message has been sent.");
        form.resetFields();
        setLoading(false);
        // empty the form fileds
        // router.push("/");
      }
    } catch (err) {
      toast.error("Form submit failed. Try again.");
      console.log(err);
      setLoading(false);
    }
  };

  return (
    <Form form={form} onFinish={onFinish}>
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
        <Input prefix={<UserOutlined />} placeholder="Your name" />
      </Form.Item>

      <Form.Item
        name="email"
        rules={[
          {
            required: true,
            message: "Please input your E-mail!",
          },
        ]}
        hasFeedback
      >
        <Input prefix={<MailOutlined />} placeholder="Your email" />
      </Form.Item>

      <Form.Item
        name="message"
        rules={[
          {
            required: true,
            message: "Please write your message",
          },
        ]}
        hasFeedback
      >
        <Input.TextArea placeholder="Write your message here.." />
      </Form.Item>

      <Form.Item>
        <Button type="primary" htmlType="submit" loading={loading}>
          Submit
        </Button>
      </Form.Item>
    </Form>
  );
};

export default Contact;
