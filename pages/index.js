import { useEffect, useState } from "react";
import { Row, Col, Divider, Button } from "antd";
import Head from "next/head";
import FullWidthImage from "../components/pages/FullWidthImage";
import RenderProgress from "../components/pages/RenderProgress";
import useNumbers from "../hooks/useNumbers";
import ParallaxImage from "../components/pages/ParallaxImage";
import usePost from "../hooks/usePost";
import useCategory from "../hooks/useCategory";
import Link from "next/link";
import { ThunderboltOutlined } from "@ant-design/icons";
import Footer from "../components/pages/Footer";
import axios from "axios";

const Home = () => {
  // hooks
  const { numbers } = useNumbers();
  const { latestPosts } = usePost();
  const { categories } = useCategory();
  // state
  const [homepage, setHomepage] = useState({
    fullWidthImage: null,
    title: "",
    subtitle: "",
  });

  useEffect(() => {
    loadHomepage();
  }, []);

  const loadHomepage = async () => {
    try {
      const { data } = await axios.get("/page/home");
      // console.log("get page in home ", data);
      setHomepage(data);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <Head>
        <title>Modern Content Management System - CMS</title>
        <meta
          name="description"
          content="Read latest blog posts on various topics"
        />
      </Head>
      <div style={{ marginBottom: 50 }}></div>
      <FullWidthImage {...homepage} />
      {/* {JSON.stringify(homepage, null, 4)} */}
      {/* numbers */}
      <Row>
        <Col
          span={6}
          style={{ marginTop: 20, textAlign: "center", fontSize: 20 }}
        >
          <RenderProgress number={numbers.posts} name="Posts" />
        </Col>
        <Col
          span={6}
          style={{ marginTop: 20, textAlign: "center", fontSize: 20 }}
        >
          <RenderProgress number={numbers.categories} name="Categories" />
        </Col>
        <Col
          span={6}
          style={{ marginTop: 20, textAlign: "center", fontSize: 20 }}
        >
          <RenderProgress number={numbers.comments} name="Comments" />
        </Col>
        <Col
          span={6}
          style={{ marginTop: 20, textAlign: "center", fontSize: 20 }}
        >
          <RenderProgress number={numbers.users} name="Users" />
        </Col>
      </Row>

      {/* parallax image */}
      {/* parallax image */}
      <div style={{ marginBottom: "20px" }}></div>

      <Row>
        <Col span={24}>
          <ParallaxImage>
            <h2
              style={{
                textAlign: "center",
                fontSize: "86px",
                textShadow: "2px 2px 4px #000000",
                color: "#fff",
              }}
            >
              BLOG POSTS
            </h2>

            <Divider>
              <ThunderboltOutlined />
            </Divider>
            <div style={{ textAlign: "center" }}>
              {latestPosts.map((p) => (
                <Link href={`/post/${p.slug}`}>
                  <a>
                    <h3 style={{ color: "#fff" }} key={p._id}>
                      {p.title}
                    </h3>
                  </a>
                </Link>
              ))}
            </div>
          </ParallaxImage>
        </Col>
      </Row>

      <Row>
        <Col
          span={24}
          style={{ textAlign: "center", marginTop: 80, marginBottom: 100 }}
        >
          <Divider>CATEGORIES</Divider>

          {categories.map((c) => (
            <Link href={`/category/${c.slug}`}>
              <a>
                <Button style={{ margin: 2 }} key={c._id}>
                  {c.name}
                </Button>
              </a>
            </Link>
          ))}
        </Col>
      </Row>

      <Footer />
    </>
  );
};

export default Home;
