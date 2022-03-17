import { Layout } from "antd";
import SubscriberNav from "../../components/nav/SubscriberNav";
import { useState, useEffect, useContext } from "react";
import { SyncOutlined } from "@ant-design/icons";
import { useRouter } from "next/router";
import { AuthContext } from "../../context/auth";
import axios from "axios";
import LoadingToRedirect from "./LoadingToRedirect";

const { Content } = Layout;

const SubscriberLayout = ({ children }) => {
  // context
  const [auth, setAuth] = useContext(AuthContext);
  // hooks
  const router = useRouter();

  // state
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (auth?.token) {
      getCurrentSubscriber();
    }
  }, [auth?.token]);

  const getCurrentSubscriber = async () => {
    try {
      const { data } = await axios.get(`/current-subscriber`);
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
    <Layout>
      <SubscriberNav />

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

export default SubscriberLayout;
