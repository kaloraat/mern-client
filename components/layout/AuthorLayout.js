import { Layout } from "antd";
import AuthorNav from "../../components/nav/AuthorNav";
import { useState, useEffect, useContext } from "react";
import { SyncOutlined } from "@ant-design/icons";
import { useRouter } from "next/router";
import { AuthContext } from "../../context/auth";
import axios from "axios";
import LoadingToRedirect from "./LoadingToRedirect";

const { Content } = Layout;

const AuthorLayout = ({ children }) => {
  // context
  const [auth, setAuth] = useContext(AuthContext);
  // hooks
  const router = useRouter();

  // state
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (auth?.token) {
      getCurrentAuthor();
    }
  }, [auth?.token]);

  const getCurrentAuthor = async () => {
    try {
      const { data } = await axios.get(`/current-author`);
      console.log("current author", data);
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
      <AuthorNav />

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

export default AuthorLayout;
