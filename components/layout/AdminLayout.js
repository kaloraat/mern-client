import { Layout } from "antd";
import AdminNav from "../../components/nav/AdminNav";
import { useState, useEffect, useContext } from "react";
import { SyncOutlined } from "@ant-design/icons";
import { useRouter } from "next/router";
import { AuthContext } from "../../context/auth";
import axios from "axios";
import LoadingToRedirect from "./LoadingToRedirect";

const { Content } = Layout;

const AdminLayout = ({ children }) => {
  // context
  const [auth, setAuth] = useContext(AuthContext);
  // hooks
  const router = useRouter();

  // state
  const [loading, setLoading] = useState(true);
  const [count, setCount] = useState(3);

  useEffect(() => {
    if (auth?.token) {
      getCurrentAdmin();
    }
  }, [auth?.token]);

  const getCurrentAdmin = async () => {
    try {
      const { data } = await axios.get(`/current-admin`);
      console.log("current admin", data);
      if (data.ok) {
        setLoading(false);
      }
    } catch (err) {
      router.push("/");
    }
  };

  return loading ? (
    <LoadingToRedirect />
  ) : (
    // <SyncOutlined
    //   spin
    //   style={{
    //     padding: 200,
    //     display: "flex",
    //     justifyContent: "center",
    //     fontSize: "50px",
    //   }}
    // />
    <Layout>
      <AdminNav />

      <Layout>
        <Content
          style={{
            margin: "16px 16px",
            overflow: "auto",
            height: "100vh",
            // position: "fixed",
            marginTop: 54,
          }}
        >
          {children}
        </Content>
      </Layout>
    </Layout>
  );
};

export default AdminLayout;
