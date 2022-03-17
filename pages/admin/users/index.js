import { useState, useEffect, useContext } from "react";
import AdminLayout from "../../../components/layout/AdminLayout";
import { Row, Col, List, Avatar, Input } from "antd";
import axios from "axios";
import toast from "react-hot-toast";
import { useRouter } from "next/router";
import Link from "next/link";
import { AuthContext } from "../../../context/auth";

const AllUsers = () => {
  // context
  const [auth, setAuth] = useContext(AuthContext);
  // console.log(auth);
  // hooks
  const router = useRouter();
  // state
  const [users, setUsers] = useState("");
  const [keyword, setKeyword] = useState("");

  useEffect(() => {
    if (auth?.token) loadUsers();
  }, [auth?.token]);

  const loadUsers = async () => {
    try {
      const { data } = await axios.get("/users");
      setUsers(data);
    } catch (err) {
      console.log(err);
    }
  };

  const handleDelete = async (item) => {
    if (item._id === auth.user._id) {
      alert("You can not delete yourself");
      return;
    }
    try {
      const { data } = await axios.delete(`/user/${item._id}`);
      if (data?.error) {
        toast.error(data.error);
      } else {
        console.log("user deleted", data);
        setUsers((previousUsers) =>
          previousUsers.filter((user) => user._id !== data._id)
        );
        toast.success("User deleted successfully");
      }
    } catch (err) {
      console.log(err);
    }
  };

  const dynamicRoutename = (user) =>
    user._id === auth.user._id ? "update-user" : "update-user-by-admin";

  const filteredUsers =
    users && users.filter((user) => user.name.toLowerCase().includes(keyword));

  return (
    <AdminLayout>
      <Row>
        <Col span={24}>
          <h4 style={{ marginBottom: "-10px" }}>All users</h4>
          <br />

          <Input
            placeholder="Search"
            type="search"
            value={keyword}
            onChange={(e) => setKeyword(e.target.value.toLowerCase())}
          />

          <List
            itemLayout="horizontal"
            dataSource={filteredUsers}
            renderItem={(item) => (
              <List.Item
                actions={[
                  <Link
                    href={{
                      pathname: `/admin/users/${item._id}`,
                      query: { routename: dynamicRoutename(item) },
                    }}
                  >
                    <a>edit</a>
                  </Link>,
                  <a
                    onClick={() => handleDelete(item)}
                    disabled={item._id === auth.user._id}
                  >
                    delete
                  </a>,
                ]}
              >
                <Avatar src={item.image?.url}>{item.name[0]}</Avatar>
                <List.Item.Meta title={item.name} style={{ marginLeft: 10 }} />
                <List.Item.Meta
                  description={item.email}
                  style={{ marginLeft: 10 }}
                />
                <List.Item.Meta
                  description={item.role}
                  style={{ marginLeft: 10 }}
                />
                <List.Item.Meta
                  description={`${item.posts.length} post`}
                  style={{ marginLeft: 10 }}
                />
              </List.Item>
            )}
          />
        </Col>
      </Row>
    </AdminLayout>
  );
};

export default AllUsers;
