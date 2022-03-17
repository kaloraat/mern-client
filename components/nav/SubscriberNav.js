import React, { useState, useContext, useEffect } from "react";
import { Menu, Button } from "antd";
import {
  CommentOutlined,
  UserOutlined,
  SettingOutlined,
} from "@ant-design/icons";
import { Layout } from "antd";
import Link from "next/link";
import { useWindowWidth } from "@react-hook/window-size";
import { AuthContext } from "../../context/auth";

const { Sider } = Layout;

const { SubMenu } = Menu;

const SubscriberNav = () => {
  // context
  const [auth, setAuth] = useContext(AuthContext);
  // state
  const [collapsed, setCollapsed] = useState(false);
  const [current, setCurrent] = useState("");

  useEffect(() => {
    process.browser && setCurrent(window.location.pathname);
  }, [process.browser && window.location.pathname]);

  // console.log("##### NAV ##### ", current);

  // detect window size and collapse sidebar
  const onlyWidth = useWindowWidth();
  useEffect(() => {
    console.log("onlyWidth", onlyWidth);
    if (onlyWidth < 800) {
      setCollapsed(true);
    } else if (onlyWidth > 800) {
      setCollapsed(false);
    }
  }, [onlyWidth < 800]);

  const activeName = (name) => `nav-link ${current === name && "active"}`;

  return (
    <Sider
      collapsible
      collapsed={collapsed}
      onCollapse={() => setCollapsed(!collapsed)}
      style={{
        marginTop: 50,
      }}
    >
      <Menu
        // defaultSelectedKeys={["1"]}
        mode="inline"
        inlineCollapsed={collapsed}
      >
        <Menu.Item key="19" icon={<SettingOutlined />}>
          <Link href="/subscriber">
            <a className={activeName("/subscriber")}>Dashboard</a>
          </Link>
        </Menu.Item>

        <Menu.Item key="12" icon={<CommentOutlined />}>
          <Link href="/subscriber/comments">
            <a className={activeName("/subscriber/comments")}>Comments</a>
          </Link>
        </Menu.Item>

        <Menu.Item key="17" icon={<UserOutlined />}>
          <Link
            href={{
              pathname: `/subscriber/${auth.user?._id}`,
              query: { routename: "update-user" },
            }}
          >
            <a className={activeName(`/subscriber/${auth.user?._id}`)}>
              Profile
            </a>
          </Link>
        </Menu.Item>
      </Menu>
    </Sider>
  );
};

export default SubscriberNav;
