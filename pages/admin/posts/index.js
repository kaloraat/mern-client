import { useState, useEffect, useContext } from "react";
import AdminLayout from "../../../components/layout/AdminLayout";
import { Row, Col, Button, List, Input } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import Link from "next/link";
import axios from "axios";
import PostsList from "../../../components/posts/PostsList";
import { PostContext } from "../../../context/post";

const Posts = () => {
  // context
  const [post, setPost] = useContext(PostContext);
  const { posts } = post;
  // state
  const [loading, setLoading] = useState(false);
  const [keyword, setKeyword] = useState("");
  // console.log(keyword);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const { data } = await axios.get("/posts-for-admin");
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
    <AdminLayout>
      <Row>
        <Col span={24}>
          <Button
            type="primary"
            htmlType="submit"
            style={{ margin: "10px 0px 10px 0" }}
          >
            <Link href="/admin/posts/new">
              <a>
                <PlusOutlined /> Add New
              </a>
            </Link>
          </Button>
          <h1>{posts?.length} Posts</h1>

          <Input
            placeholder="Search"
            type="search"
            value={keyword}
            onChange={(e) => setKeyword(e.target.value.toLowerCase())}
          />

          <PostsList
            posts={posts.filter((post) =>
              post.title.toLowerCase().includes(keyword)
            )}
            handleDelete={handleDelete}
          />
        </Col>
      </Row>
    </AdminLayout>
  );
};

export default Posts;
