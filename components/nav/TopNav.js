import { useState, useEffect, useContext } from "react";
import { Menu } from "antd";
import {
  UserAddOutlined,
  SettingOutlined,
  CloudTwoTone,
  DatabaseOutlined,
  MailOutlined,
} from "@ant-design/icons";
import ToggleTheme from "./ToggleTheme";
import Link from "next/link";
import { AuthContext } from "../../context/auth";
import { useRouter } from "next/router";
import { toast } from "react-hot-toast";

const { SubMenu } = Menu;

const TopNav = () => {
  // context
  const [auth, setAuth] = useContext(AuthContext);
  // hooks
  const router = useRouter();
  // state
  const [current, setCurrent] = useState("mail");

  const signout = async () => {
    setAuth({ user: null, token: "" });
    localStorage.removeItem("auth");
    toast.success("Successfully logged out");
    router.push("/signin");
  };

  const roleBasedLink = () => {
    if (auth.user?.role === "Admin") {
      return "/admin";
    } else if (auth.user?.role === "Author") {
      return "/author";
    } else {
      return "/subscriber";
    }
  };

  return (
    <>
      <Menu
        onClick={(e) => setCurrent(e.key)}
        selectedKeys={[current]}
        mode="horizontal"
        theme="dark"
        style={{
          position: "fixed",
          top: 0,
          width: "100%",
          zIndex: 999,
        }}
      >
        <Menu.Item key="mail" icon={<CloudTwoTone />}>
          <Link href="/">
            <a>CMS</a>
          </Link>
        </Menu.Item>

        <Menu.Item key="posts" icon={<DatabaseOutlined />}>
          <Link href="/posts">
            <a>Posts</a>
          </Link>
        </Menu.Item>

        <Menu.Item key="contact" icon={<MailOutlined />}>
          <Link href="/contact">
            <a>Contact</a>
          </Link>
        </Menu.Item>

        {auth?.user !== null && (
          <SubMenu
            key="SubMenu"
            icon={<SettingOutlined />}
            title={auth?.user?.name || "Dashboard"}
            style={{ marginLeft: "auto" }}
          >
            <Menu.ItemGroup title="Management">
              <Menu.Item key="setting:1">
                <Link href={roleBasedLink()}>
                  <a>Dashboard</a>
                </Link>
              </Menu.Item>
            </Menu.ItemGroup>

            <Menu.ItemGroup title="Others">
              <Menu.Item key="setting:2" onClick={signout}>
                Sign out
              </Menu.Item>
            </Menu.ItemGroup>
          </SubMenu>
        )}

        {auth?.user === null && (
          <>
            <Menu.Item
              key="signin"
              icon={<UserAddOutlined />}
              style={{ marginLeft: "auto" }}
            >
              <Link href="/signin">
                <a>Sign In</a>
              </Link>
            </Menu.Item>

            <Menu.Item key="signup" icon={<UserAddOutlined />}>
              <Link href="/signup">
                <a>Sign Up</a>
              </Link>
            </Menu.Item>
          </>
        )}

        <Menu.Item key="toggle">
          <ToggleTheme />
        </Menu.Item>
      </Menu>
    </>
  );
};

export default TopNav;
