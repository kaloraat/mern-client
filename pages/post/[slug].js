import { useState, useContext } from "react";
import axios from "axios";
import {
  Card,
  Row,
  Col,
  Avatar,
  Button,
  Typography,
  List,
  Divider,
} from "antd";
import Head from "next/head";
import Link from "next/link";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import Editor from "rich-markdown-editor";
import { ThemeContext } from "../../context/theme";
import CommentForm from "../../components/comment/CommentForm";
import toast from "react-hot-toast";
import { AuthContext } from "../../context/auth";
import { ShareSocial } from "react-share-social";
import useCategory from "../../hooks/useCategory";
import usePost from "../../hooks/usePost";

const { Meta } = Card;
const { Title } = Typography;
dayjs.extend(relativeTime);

const SinglePost = ({ post, postComments }) => {
  console.log(post);
  // context
  const [theme, setTheme] = useContext(ThemeContext);
  const [auth, setAuth] = useContext(AuthContext);
  // hooks
  const { categories } = useCategory();
  const { latestPosts } = usePost();
  // state
  const [comment, setComment] = useState("");
  const [comments, setComments] = useState(postComments);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    try {
      setLoading(true);
      const { data } = await axios.post(`/comment/${post._id}`, { comment });
      console.log("comment posted", data);
      setComment("");
      setComments([data, ...comments]);
      toast.success("Comment posted successfully");
      setLoading(false);
    } catch (err) {
      console.log(err);
      toast.error("Comment post failed. Try again.");
      setLoading(false);
    }
  };

  return (
    <>
      <Head>
        <title>{post.title}</title>
        <meta name="description" content={post.content.substring(0, 160)} />
      </Head>
      <div style={{ marginTop: "60px" }}></div>
      <Row gutter={12}>
        <Col sm={24} lg={18} style={{ marginBottom: 12 }}>
          <Card
            cover={
              <img
                src={
                  post.featuredImage?.url ||
                  "https://via.placeholder.com/1200x400.png?text=..."
                }
                alt={post.title}
              />
            }
          >
            <Title>{post.title}</Title>
            <p className="h2">
              {dayjs(post.createdAt).format("MMMM D, YYYY h:mm A")} / 0 Comments
              {post.categories?.length > 0 && (
                <>
                  {" / "}
                  in{" "}
                  {post.categories?.map((c) => (
                    <span key={c.name}>
                      <Link href={`/category/${c.slug}`}>
                        <a>{c.name} </a>
                      </Link>
                    </span>
                  ))}
                </>
              )}
              {post.postedBy?.name && ` / by ${post.postedBy.name}`}
            </p>

            <div style={{ marginTop: "-20px", marginBottom: "15px" }}>
              <ShareSocial
                url={process.browser && window.location.href}
                socialTypes={["facebook", "twitter", "reddit", "linkedin"]}
                style={{
                  height: "100px",
                  overflow: "hidden",
                  background: "none",
                }}
              />
            </div>

            <Editor
              style={{ width: "100%" }}
              dark={theme === "light" ? false : true}
              defaultValue={post.content}
              readOnly={true}
            />

            <br />

            {auth.user === null && auth.token === "" ? (
              <Link href="/signin">
                <a>Login to comment</a>
              </Link>
            ) : (
              <h3>{comments.length} Comments</h3>
            )}

            <CommentForm
              handleSubmit={handleSubmit}
              comment={comment}
              setComment={setComment}
              loading={loading}
            />

            <div style={{ marginBottom: 50 }}></div>
            {/* render comments */}
            <List
              itemLayout="horizontal"
              dataSource={comments}
              renderItem={(item) => (
                <List.Item id={item._id}>
                  <List.Item.Meta
                    avatar={<Avatar>{item.postedBy?.name?.charAt(0)}</Avatar>}
                    title={<a>{item.postedBy?.name}</a>}
                    description={`${item.content} - ${dayjs(
                      item.createdAt
                    ).fromNow()}`}
                  />
                </List.Item>
              )}
            />

            <br />
          </Card>
        </Col>
        {/* sidebar */}
        <Col sm={24} lg={6}>
          {/* categories */}

          <Divider orientation="left" plain>
            Categories
          </Divider>
          {categories.map((c) => (
            <Link href={`/category/${c.slug}`}>
              <a>
                <Button style={{ margin: 2 }} key={c._id}>
                  {c.name}
                </Button>
              </a>
            </Link>
          ))}

          {/* posts */}

          <Divider orientation="left" plain>
            Recent Posts
          </Divider>
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
  const { data } = await axios.get(`${process.env.API}/post/${params.slug}`);
  return {
    props: {
      post: data.post,
      postComments: data.comments,
    },
  };
}

export default SinglePost;
