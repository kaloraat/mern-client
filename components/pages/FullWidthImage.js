import { useContext } from "react";
import { Button } from "antd";
import { SendOutlined } from "@ant-design/icons";
import Link from "next/link";
import { AuthContext } from "../../context/auth";

const FullWidthImage = ({ title, subtitle, fullWidthImage }) => {
  // context
  const [auth, setAuth] = useContext(AuthContext);

  const roleBasedLink = () => {
    if (auth?.user?.role === "Admin") {
      return "/admin";
    } else if (auth?.user?.role === "Author") {
      return "/author";
    } else if (auth?.user?.role === "Subscriber") {
      return "/subscriber";
    } else {
      return "/signin";
    }
  };

  return (
    <>
      <img
        src={fullWidthImage?.url ? fullWidthImage.url : "/images/bg4.jpeg"}
        style={{ width: "100%", height: "500px", overflow: "hidden" }}
      />
      <div
        style={{
          textAlign: "center",
          marginTop: "-420px",
          fontSize: "66px",
          textShadow: "2px 2px 4px #000000",
        }}
      >
        <h1 style={{ color: "#fff" }}>{title ? title : "CMS"}</h1>
        <p style={{ fontSize: "15px", marginTop: "-66px", color: "#fff" }}>
          {subtitle ? subtitle : "Content Management System"}
        </p>
        <div style={{ margin: "25px 0px 75px 0px" }}>
          <Link href={roleBasedLink()}>
            <a>
              <Button type="primary" size="large" icon={<SendOutlined spin />}>
                Explore
              </Button>
            </a>
          </Link>
        </div>
      </div>
    </>
  );
};

export default FullWidthImage;
