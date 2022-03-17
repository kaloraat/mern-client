import { useState, useEffect, useContext } from "react";
import { Row, Col, Button, List, Input, Modal } from "antd";
import axios from "axios";
import { AuthContext } from "../../context/auth";
import toast from "react-hot-toast";
import Link from "next/link";
import CommentForm from "./CommentForm";
import dayjs from "dayjs";
var localizedFormat = require("dayjs/plugin/localizedFormat");

dayjs.extend(localizedFormat);

const UserComments = () => {
  // context
  const [auth, setAuth] = useContext(AuthContext);
  const [page, setPage] = useState(1);
  // state
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(false);
  const [keyword, setKeyword] = useState("");
  // update
  const [selectedComment, setSelectedComment] = useState({});
  const [content, setContent] = useState("");
  const [visible, setVisible] = useState(false);

  // console.log("comments.length, total", comments.length, total);

  useEffect(() => {
    if (auth?.token) {
      fetchComments();
    }
  }, [auth?.token]);

  const fetchComments = async () => {
    try {
      const { data } = await axios.get(`/user-comments`);
      setComments(data);
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
        toast.success("Comment deleted successfully");
      }
    } catch (err) {
      console.log(err);
      toast.error("Delete failed. Try again.");
    }
  };

  const handleSubmit = async () => {
    console.log("selectedComment", selectedComment);
    try {
      setLoading(true);
      const { data } = await axios.put(`/comment/${selectedComment._id}`, {
        content,
      });

      // console.log("comment updated", data);
      let arr = comments;
      const index = arr.findIndex((el) => el._id === data._id);
      arr[index].content = data.content;
      setComments(arr);

      toast.success("Comment updated");
      setLoading(false);
      setVisible(false);
      setSelectedComment({});
    } catch (err) {
      console.log(err);
      toast.error("Comment post failed. Try again.");
      setLoading(false);
    }
  };

  const filteredComments =
    comments &&
    comments.filter((c) => c.content.toLowerCase().includes(keyword));

  return (
    <>
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
                  <Link href={`/post/${item.postId.slug}#${item._id}`}>
                    <a>view</a>
                  </Link>,
                  <a
                    onClick={() => {
                      setVisible(true);
                      setSelectedComment(item);
                      setContent(item.content);
                    }}
                  >
                    edit
                  </a>,
                  <a onClick={() => handleDelete(item)}>delete</a>,
                ]}
              >
                <List.Item.Meta
                  description={`On ${item.postId.title} | ${
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
        <Col span="24">
          <Modal
            onOk={() => setVisible(false)}
            onCancel={() => setVisible(false)}
            visible={visible}
            title="Update comment"
            footer={null}
          >
            <CommentForm
              handleSubmit={handleSubmit}
              comment={content}
              setComment={setContent}
              loading={loading}
            />
          </Modal>
        </Col>
      </Row>
    </>
  );
};

export default UserComments;
