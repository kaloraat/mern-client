import React, { useState, useContext, useEffect } from "react";
import { Menu, Button } from "antd";
import {
  PushpinOutlined,
  CameraOutlined,
  FileTextOutlined,
  CommentOutlined,
  UserSwitchOutlined,
  SettingOutlined,
  BgColorsOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Layout } from "antd";
import Link from "next/link";
import { AuthContext } from "../../context/auth";
import { useRouter } from "next/router";
import { useWindowWidth } from "@react-hook/window-size";

const { Sider } = Layout;

const { SubMenu } = Menu;

const AdminNav = () => {
  // context
  const [auth, setAuth] = useContext(AuthContext);
  // hooks
  const router = useRouter();
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
        defaultOpenKeys={["1", "6", "9", "14"]}
        mode="inline"
        inlineCollapsed={collapsed}
      >
        <Menu.Item key="19" icon={<SettingOutlined />}>
          <Link href="/admin">
            <a className={activeName("/admin")}>Dashboard</a>
          </Link>
        </Menu.Item>
        {/* posts */}
        <SubMenu key="1" icon={<PushpinOutlined />} title="Posts">
          <Menu.Item key="2">
            <Link href="/admin/posts">
              <a className={activeName("/admin/posts")}>All Posts</a>
            </Link>
          </Menu.Item>
          <Menu.Item key="3">
            <Link href="/admin/posts/new">
              <a className={activeName("/admin/posts/new")}>Add New</a>
            </Link>
          </Menu.Item>
          <Menu.Item key="4">
            <Link href="/admin/categories">
              <a className={activeName("/admin/categories")}>Categories</a>
            </Link>
          </Menu.Item>
        </SubMenu>
        {/* media */}
        <SubMenu key="6" icon={<CameraOutlined />} title="Media">
          <Menu.Item key="7">
            <Link href="/admin/media/library">
              <a className={activeName("/admin/media/library")}>Library</a>
            </Link>
          </Menu.Item>
          <Menu.Item key="8">
            <Link href="/admin/media/new">
              <a className={activeName("/admin/media/new")}>Add New</a>
            </Link>
          </Menu.Item>
        </SubMenu>

        <Menu.Item key="12" icon={<CommentOutlined />}>
          <Link href="/admin/comments">
            <a className={activeName("/admin/comments")}>Comments</a>
          </Link>
        </Menu.Item>

        {/* users */}
        <SubMenu key="14" icon={<UserSwitchOutlined />} title="Users">
          <Menu.Item key="15">
            <Link href="/admin/users">
              <a className={activeName("/admin/users")}>All Users</a>
            </Link>
          </Menu.Item>
          <Menu.Item key="16">
            <Link href="/admin/users/new">
              <a className={activeName("/admin/users/new")}>Add New</a>
            </Link>
          </Menu.Item>
        </SubMenu>
        <Menu.Item key="17" icon={<UserOutlined />}>
          <Link
            href={{
              pathname: `/admin/${auth.user?._id}`,
              query: { routename: "update-user" },
            }}
          >
            <a className={activeName(`/admin/${auth.user?._id}`)}>Profile</a>
          </Link>
        </Menu.Item>
        <Menu.Item key="18" icon={<BgColorsOutlined />}>
          <Link href="/admin/customize">
            <a className={activeName(`/admin/customize`)}>Customize</a>
          </Link>
        </Menu.Item>
      </Menu>
    </Sider>
  );
};

export default AdminNav;
