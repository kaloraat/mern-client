import { useContext } from "react";
import { Row, Col } from "antd";
import ParallaxImage from "./ParallaxImage";
import {
  UsergroupAddOutlined,
  ApiOutlined,
  CopyrightOutlined,
} from "@ant-design/icons";
import { ThemeContext } from "../../context/theme";

const Footer = () => {
  const [theme, setTheme] = useContext(ThemeContext);

  return (
    <div
      style={{ borderTop: `5px solid ${theme === "light" ? "#000" : "#fff"}` }}
    >
      <ParallaxImage url="/images/bg6.jpeg">
        <Row>
          <Col style={{ textAlign: "center", color: "#000" }} span={8}>
            <UsergroupAddOutlined style={{ fontSize: 80 }} />
            <br />
            The Ultimate Blogging Platform
          </Col>
          <Col style={{ textAlign: "center", color: "#000" }} span={8}>
            <ApiOutlined style={{ fontSize: 80 }} />
            <br />
            Built using MERN Stack (MongonDB, Express, React, Node)
          </Col>
          <Col style={{ textAlign: "center", color: "#000" }} span={8}>
            <CopyrightOutlined style={{ fontSize: 80 }} />
            <br />
            Copyright {new Date().getFullYear()} &copy; All rights reserved
          </Col>
        </Row>
        <br />
      </ParallaxImage>
    </div>
  );
};

export default Footer;
