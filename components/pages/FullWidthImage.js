import { Button } from "antd";
import { SendOutlined } from "@ant-design/icons";
import Link from "next/link";

const FullWidthImage = () => (
  <>
    <img
      src="/images/bg4.jpeg"
      style={{ width: "100%", height: "500px", overflow: "hidden" }}
    />
    <div
      style={{
        textAlign: "center",
        marginTop: "-420px",
        fontSize: "100px",
        textShadow: "2px 2px 4px #000000",
      }}
    >
      <h1 style={{ color: "#fff" }}>CMS</h1>
      <p style={{ fontSize: "15px", marginTop: "-167px", color: "#fff" }}>
        Content Management System
      </p>
      <div style={{ marginTop: "-9px" }}>
        <Link href="/subscriber">
          <a>
            <Button size="large" icon={<SendOutlined spin />}>
              Explore
            </Button>
          </a>
        </Link>
      </div>
    </div>
  </>
);

export default FullWidthImage;
