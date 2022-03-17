import { useEffect, useState } from "react";
import axios from "axios";
import { Card, Row, Col, Avatar, Button } from "antd";
import Head from "next/head";
import Link from "next/link";
import Router, { useRouter } from "next/router";

const { Meta } = Card;

const Posts = ({ posts }) => {
  // hook
  const router = useRouter();
  console.log("router -> ", router);
  // state
  const [allPosts, setAllPosts] = useState(posts);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(Number(router?.query?.page) || 1);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    getTotal();
  }, []);

  useEffect(() => {
    if (page === 1) return;
    loadMore();
  }, [page]);

  const getTotal = async () => {
    try {
      const { data } = await axios.get("/post-count");
      setTotal(data);
    } catch (err) {
      console.log(err);
    }
  };

  const loadMore = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(`/posts/${page}`);
      setAllPosts([...allPosts, ...data]);
      setLoading(false);
    } catch (err) {
      setLoading(false);
      console.log(err);
    }
  };

  return (
    <>
      <Head>
        <title>Recent blog posts</title>
        <meta
          name="description"
          content="Blog posts about web development, programming, and more."
        />
      </Head>
      <div style={{ marginTop: "60px" }}></div>
      <Row gutter={12}>
        {allPosts.map((post) => (
          <Col xs={24} xl={8} style={{ marginBottom: 12 }}>
            <Link href={`/post/${post.slug}`}>
              <a>
                <Card
                  hoverable
                  cover={
                    <Avatar
                      shape="square"
                      style={{ height: "200px" }}
                      src={
                        post.featuredImage?.url ||
                        "https://via.placeholder.com/1200x800.png?text=..."
                      }
                      alt={post.title}
                    />
                  }
                >
                  <Meta title={post.title} />
                </Card>
              </a>
            </Link>
          </Col>
        ))}
      </Row>

      <Row>
        <Col span={24} style={{ textAlign: "center" }}>
          {allPosts?.length < total && (
            <div style={{ padding: 50 }}>
              <Button
                size="large"
                type="primary"
                loading={loading}
                onClick={() => {
                  setPage(page + 1);
                  Router.push({
                    pathname: "/posts",
                    query: { page: page + 1 },
                  });
                }}
              >
                Load More
              </Button>
            </div>
          )}
        </Col>
      </Row>
    </>
  );
};

export async function getServerSideProps() {
  const { data } = await axios.get(`${process.env.API}/posts/1`);
  // console.log("DATA =====> ", data.length);
  return {
    props: {
      posts: data,
    },
  };
}

export default Posts;
