import { useState, useContext, useEffect } from "react";
import { Row, Col, Divider, Input, Button, Image } from "antd";
import { MediaContext } from "../../context/media";
import Media from "../media/Media";
import axios from "axios";
import toast from "react-hot-toast";

const Homepage = () => {
  // context
  const [media, setMedia] = useContext(MediaContext);
  // state
  const [title, setTitle] = useState("");
  const [subtitle, setSubtitle] = useState("");
  const [loading, setLoading] = useState(false);
  const [fullWidthImage, setFullWidthImage] = useState({});

  useEffect(() => {
    loadHomepage();
  }, []);

  const loadHomepage = async () => {
    try {
      const { data } = await axios.get("/page/home");
      console.log("get page ", data);
      setTitle(data.title);
      setSubtitle(data.subtitle);
      setFullWidthImage(data.fullWidthImage);
    } catch (err) {
      console.log(err);
    }
  };

  const handleSave = async () => {
    try {
      setLoading(true);

      const { data } = await axios.post("/page", {
        page: "home",
        title,
        subtitle,
        fullWidthImage: media?.selected?._id,
      });
      setLoading(false);
      console.log("home page updated res => ", data);
      toast.success("Saved");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      {/* stats */}
      <Row>
        <Col span={24}>
          <Divider>
            <h1>Customize Home Page</h1>
            <p>Set full width image, title and subtitle</p>
          </Divider>
        </Col>

        <Col span={18}>
          <Media />

          <Input
            style={{ margin: "20px 0px 20px 0px" }}
            size="large"
            placeholder="Give it a title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />

          <Input
            size="large"
            placeholder="Give it sub title"
            value={subtitle}
            onChange={(e) => setSubtitle(e.target.value)}
          />

          <Button
            onClick={handleSave}
            type="default"
            htmlType="submit"
            style={{ margin: "10px 0px 10px 0" }}
            loading={loading}
            block
          >
            Save
          </Button>
        </Col>

        <Col span={6}>
          <div style={{ margin: " 40px 0px 0px 20px" }}>
            {media.selected ? (
              <>
                <div style={{ marginBottom: 15 }}></div>

                <Image width="100%" src={media.selected.url} />
              </>
            ) : fullWidthImage ? (
              <>
                <div style={{ marginBottom: 15 }}></div>

                <Image width="100%" src={fullWidthImage.url} />
              </>
            ) : (
              ""
            )}
          </div>
        </Col>
      </Row>
    </>
  );
};

export default Homepage;
