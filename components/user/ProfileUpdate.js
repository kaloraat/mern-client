import { useState, useEffect, useContext } from "react";
import { Row, Col, Button, Input, Image, Avatar } from "antd";
import { AuthContext } from "../../context/auth";
import axios from "axios";
import { Select, Typography } from "antd";
import toast from "react-hot-toast";
import { useRouter } from "next/router";
import Media from "../media/Media";
import { MediaContext } from "../../context/media";

const { Option } = Select;

const ProfileUpdate = ({ title }) => {
  // context
  const [auth, setAuth] = useContext(AuthContext);
  const [media, setMedia] = useContext(MediaContext);
  // hooks
  const router = useRouter();
  // console.log("ROUTER QUERY =>", router);
  // state
  const [id, setId] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [website, setWebsite] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");
  const [image, setImage] = useState("");
  const [loading, setLoading] = useState(false);
  // to show/hide roles
  const [showRoles, setShowRoles] = useState(false);

  useEffect(() => {
    const currentUser = async () => {
      try {
        const { data } = await axios.get(`/current-user`);
        // console.log("current user", data);
        setName(data.name);
        setEmail(data.email);
        setWebsite(data.website);
        setRole(data.role);
        setId(data._id);
        setImage(data.image);
      } catch (err) {
        console.log(err);
      }
    };
    if (auth?.token) currentUser();
  }, [auth]);

  useEffect(() => {
    if (router.query?.routename === "update-user-by-admin") {
      setShowRoles(true);
    }
  }, [router.query?.routename]);

  const handleSubmit = async () => {
    try {
      setLoading(true);
      const { data } = await axios.put(`/${router.query.routename}`, {
        id,
        name,
        email,
        website,
        password,
        role,
        // make sure to use .populate('image') in controller currentUser response
        image: media?.selected?._id
          ? media.selected._id
          : image?._id
          ? image._id
          : undefined,
      });
      // console.log("PROFILE UPDATED => ", data);
      if (data?.error) {
        toast.error(data.error);
        setLoading(false);
      } else {
        console.log("data on update profile => ", data);
        // update context and local storage
        setAuth({ ...auth, user: data });

        let fromLocalStorage = JSON.parse(localStorage.getItem("auth"));
        fromLocalStorage.user = data;
        localStorage.setItem("auth", JSON.stringify(fromLocalStorage));

        toast.success("Profile updated successfully");
        setLoading(false);
      }
    } catch (err) {
      console.log(err);
      toast.error("Profile update failed. Try again.");
      setLoading(false);
    }
  };

  return (
    <Row>
      <Col span={12} offset={6}>
        <h4>{title}</h4>

        <div style={{ marginBottom: 20, textAlign: "center" }}>
          {media.selected ? (
            <>
              <div style={{ marginBottom: 15 }}></div>

              <Avatar src={media.selected.url} size={100} />
            </>
          ) : image ? (
            <>
              <div style={{ marginBottom: 15 }}></div>

              <Avatar src={image.url} size={100} />
            </>
          ) : (
            ""
          )}
        </div>

        {auth.user?.role !== "Subscriber" && <Media />}
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
          <Input.Password
            style={{ margin: "10px 0px 10px 0px" }}
            size="large"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        {showRoles && (
          <Select
            value={role}
            style={{ width: "100%", margin: "10px 0px 10px 0px" }}
            onChange={(v) => setRole(v)}
          >
            <Option value="Subscriber">Subscriber</Option>
            <Option value="Author">Author</Option>
            <Option value="Admin">Admin</Option>
          </Select>
        )}

        <Button
          onClick={handleSubmit}
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
  );
};

export default ProfileUpdate;
