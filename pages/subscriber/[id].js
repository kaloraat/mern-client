import SubscriberLayout from "../../components/layout/SubscriberLayout";
import { useState, useEffect, useContext } from "react";
import { Row, Col, List, Avatar } from "antd";
import axios from "axios";
import toast from "react-hot-toast";
import { AuthContext } from "../../context/auth";
import { useRouter } from "next/router";
import ProfileUpdate from "../../components/user/ProfileUpdate";

const SubscriberProfile = () => {
  // context
  const [auth, setAuth] = useContext(AuthContext);
  // hooks
  const router = useRouter();
  const { id } = router.query;

  useEffect(() => {
    if (auth?.token) loadUser();
  }, [id, auth?.token]);

  const loadUser = async () => {
    try {
      const { data } = await axios.get(`/user/${id}`);
      setAuth({ ...auth, profile: data });
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <SubscriberLayout>
      <ProfileUpdate title="Edit profile" />
    </SubscriberLayout>
  );
};

export default SubscriberProfile;
