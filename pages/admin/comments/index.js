import { useState, useEffect, useContext } from "react";
import AdminLayout from "../../../components/layout/AdminLayout";
import { Row, Col, Button, List, Input } from "antd";
import axios from "axios";
import { AuthContext } from "../../../context/auth";
import toast from "react-hot-toast";
import Link from "next/link";
import dayjs from "dayjs";
var localizedFormat = require("dayjs/plugin/localizedFormat");

dayjs.extend(localizedFormat);

const Comments = () => {
  // context
  const [auth, setAuth] = useContext(AuthContext);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  // state
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(false);
  const [keyword, setKeyword] = useState("");
  console.log("comments.length, total", comments.length, total);

  useEffect(() => {
    if (auth?.token) {
      fetchComments();
      getTotal();
    }
  }, [auth?.token]);

  useEffect(() => {
    if (page === 1) return;
    if (auth?.token) loadMore();
  }, [page, auth?.token]);

  const fetchComments = async () => {
    try {
      const { data } = await axios.get(`/comments/${page}`);
      setComments(data);
    } catch (err) {
      console.log(err);
    }
  };

  const getTotal = async () => {
    try {
      const { data } = await axios.get("/comment-count");
      setTotal(data);
    } catch (err) {
      console.log(err);
    }
  };

  const loadMore = async () => {
    try {
      const { data } = await axios.get(`/comments/${page}`);
      setComments([...comments, ...data]);
    } catch (err) {
      console.log(err);
    }
  };

  const handleDelete = async (comment) => {
    try {
      const answer = window.confirm("Are you sure you want to delete?");
      if (!answer) return;
      const { data } = await axios.delete(`/comment/${comment._id}`);
      console.log("DATATATA => ", data);
      if (data.ok) {
        setComments(comments.filter((c) => c._id !== comment._id));
        setTotal(total - 1);
        toast.success("Comment deleted successfully");
      }
    } catch (err) {
      console.log(err);
      toast.error("Delete failed. Try again.");
    }
  };

  const filteredComments =
    comments &&
    comments.filter((c) => c.content.toLowerCase().includes(keyword));

  return (
    <AdminLayout>
      <Row>
        <Col span={24}>
          <h1>{comments?.length} Comments</h1>

          <Input
            placeholder="Search"
            type="search"
            value={keyword}
            onChange={(e) => setKeyword(e.target.value.toLowerCase())}
          />

          <List
            style={{ marginTop: 20 }}
            itemLayout="horizontal"
            dataSource={filteredComments}
            renderItem={(item) => (
              <List.Item
                actions={[
                  <Link href={`/post/${item?.postId?.slug}#${item._id}`}>
                    <a>view</a>
                  </Link>,
                  <a onClick={() => handleDelete(item)}>delete</a>,
                ]}
              >
                <List.Item.Meta
                  description={`On ${item?.postId?.title} | ${
                    item.postedBy.name
                  } | ${dayjs(item.createdAt).format("L LT")}`}
                  title={item.content}
                />
              </List.Item>
            )}
          />
        </Col>
      </Row>

      <Row>
        <Col span={24} style={{ textAlign: "center" }}>
          {/* {comments?.length < total && ( */}
          {page * 3 < total && (
            <div style={{ padding: 50 }}>
              <Button
                size="large"
                type="primary"
                loading={loading}
                onClick={() => setPage(page + 1)}
              >
                Load More
              </Button>
            </div>
          )}
        </Col>
      </Row>
    </AdminLayout>
  );
};

export default Comments;
