import axios from "axios";
import { Card, Row, Col, Button, Typography, Divider, Avatar } from "antd";
import Head from "next/head";
import Link from "next/link";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import useCategory from "../../hooks/useCategory";
import usePost from "../../hooks/usePost";

const { Title } = Typography;
dayjs.extend(relativeTime);

const SingleCategory = ({ category, posts }) => {
  // hooks
  const { categories } = useCategory();
  const { latestPosts } = usePost();

  return (
    <>
      <Head>
        <title>{category.name}</title>
        <meta
          name="description"
          content={`Read latest posts on ${category.name}`}
        />
      </Head>
      <div style={{ marginTop: "60px" }}></div>
      <Row gutter={12}>
        <Col sm={24} lg={18} style={{ marginBottom: 12 }}>
          <h1 style={{ textAlign: "center" }}>Posts in {category.name}</h1>
          {posts.map((post) => (
            <Card key={post._id}>
              <div style={{ display: "flex" }}>
                <Avatar
                  shape="circle"
                  size={60}
                  style={{ marginRight: 15 }}
                  src={
                    post.featuredImage?.url ||
                    "https://via.placeholder.com/1200x400.png?text=..."
                  }
                  alt={post.title}
                />{" "}
                <div>
                  <Title level={3}>
                    <Link href={`/post/${post.slug}`}>
                      <a>{post.title}</a>
                    </Link>
                  </Title>
                  <p>
                    {dayjs(post.createdAt).format("MMMM D, YYYY h:mm A")} / 0
                    Comments
                    {post.postedBy?.name && ` / by ${post.postedBy.name}`}
                  </p>
                </div>
              </div>
            </Card>
          ))}
        </Col>
        {/* sidebar */}
        <Col sm={24} lg={6}>
          {/* categories */}

          <Divider>Categories</Divider>
          {categories?.map((c) => (
            <Link href={`/category/${c.slug}`}>
              <a>
                <Button style={{ margin: 2 }} key={c._id}>
                  {c.name}
                </Button>
              </a>
            </Link>
          ))}

          {/* posts */}

          <Divider>Recent Posts</Divider>
          {latestPosts.map((p) => (
            <Link href={`/post/${p.slug}`}>
              <a>
                <h4 key={p._id}>{p.title}</h4>
              </a>
            </Link>
          ))}
        </Col>
      </Row>
    </>
  );
};

export async function getServerSideProps({ params }) {
  const { data } = await axios.get(
    `${process.env.API}/posts-by-category/${params.slug}`
  );
  return {
    props: {
      category: data.category,
      posts: data.posts,
    },
  };
}

export default SingleCategory;
