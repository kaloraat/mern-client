import { useState, useEffect, useContext } from "react";
import AuthorLayout from "../../../components/layout/AuthorLayout";
import { Row, Col, Button, List } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import Link from "next/link";
import axios from "axios";
import PostsList from "../../../components/posts/PostsList";
import { PostContext } from "../../../context/post";
import toast from "react-hot-toast";

const Posts = () => {
  // context
  const [post, setPost] = useContext(PostContext);
  const { posts } = post;
  // state
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const { data } = await axios.get("/posts-by-author");
        setPost((prev) => ({ ...prev, posts: data }));
      } catch (err) {
        console.log(err);
      }
    };
    fetchPosts();
  }, []);

  const handleDelete = async (post) => {
    try {
      const answer = window.confirm("Are you sure you want to delete?");
      if (!answer) return;
      const { data } = await axios.delete(`/post/${post._id}`);
      if (data.ok) {
        setPost((prev) => ({
          ...prev,
          posts: prev.posts.filter((p) => p._id !== post._id),
        }));
      }
    } catch (err) {
      console.log(err);
      toast.error("Delete failed. Try again.");
    }
  };

  return (
    <AuthorLayout>
      <Row>
        <Col span={24}>
          <Button
            type="primary"
            htmlType="submit"
            style={{ margin: "10px 0px 10px 0" }}
          >
            <Link href="/author/posts/new">
              <a>
                <PlusOutlined /> Add New
              </a>
            </Link>
          </Button>
          <h1>{posts?.length} Posts</h1>

          <PostsList posts={posts} page="author" handleDelete={handleDelete} />
        </Col>
      </Row>
    </AuthorLayout>
  );
};

export default Posts;
