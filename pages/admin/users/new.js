import { useState, useEffect, useContext } from "react";
import AdminLayout from "../../../components/layout/AdminLayout";
import { Row, Col, Button, Modal, Input, Upload, Image, Checkbox } from "antd";
import { ThemeContext } from "../../../context/theme";
import axios from "axios";
import { Select, Typography } from "antd";
import toast from "react-hot-toast";
import { useRouter } from "next/router";
import generator from "generate-password";

const { Option } = Select;

const NewUser = () => {
  // hooks

  const router = useRouter();
  // state
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [website, setWebsite] = useState("");
  const [password, setPassword] = useState(generator.generate({ length: 6 }));
  const [role, setRole] = useState("");
  const [checked, setChecked] = useState(false);
  const [loading, setLoading] = useState(false);

  const handlePublish = async () => {
    try {
      setLoading(true);
      const { data } = await axios.post("/create-user", {
        name,
        email,
        website,
        password,
        website,
        role,
        checked,
      });
      console.log("USER CREATED => ", data);
      if (data?.error) {
        toast.error(data.error);
        setLoading(false);
      } else {
        toast.success("User created successfully");
        setLoading(false);
      }
    } catch (err) {
      console.log(err);
      toast.error("User create failed. Try again.");
      setLoading(false);
    }
  };

  return (
    <AdminLayout>
      <Row>
        <Col span={12} offset={6}>
          <h4 style={{ marginBottom: "-10px" }}>Add new user</h4>
          <Input
            style={{ margin: "20px 0px 10px 0px" }}
            size="large"
            placeholder="Full name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <Input
            style={{ margin: "10px 0px 10px 0px" }}
            size="large"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <Input
            style={{ margin: "10px 0px 10px 0px" }}
            size="large"
            placeholder="Website"
            value={website}
            onChange={(e) => setWebsite(e.target.value)}
          />

          <div style={{ display: "flex" }}>
            <Button
              onClick={() => setPassword(generator.generate({ length: 6 }))}
              type="default"
              size="large"
              style={{ margin: "10px 0px 10px 0" }}
            >
              Generate Password
            </Button>
            <Input.Password
              style={{ margin: "10px 0px 10px 0px" }}
              size="large"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <Select
            defaultValue="Subscriber"
            style={{ width: "100%", margin: "10px 0px 10px 0px" }}
            onChange={(v) => setRole(v)}
          >
            <Option value="Subscriber">Subscriber</Option>
            <Option value="Author">Author</Option>
            <Option value="Admin">Admin</Option>
          </Select>

          <Checkbox
            checked={checked}
            onChange={(e) => setChecked(e.target.checked)}
          >
            Send the new user an email about their account.
          </Checkbox>

          <Button
            onClick={handlePublish}
            type="default"
            htmlType="submit"
            style={{ margin: "10px 0px 10px 0" }}
            loading={loading}
            block
          >
            Submit
          </Button>
        </Col>
      </Row>
    </AdminLayout>
  );
};

export default NewUser;
