import AdminLayout from "../../../components/layout/AdminLayout";
import EditPostComponent from "../../../components/posts/EditPostComponent";

const EditPost = () => {
  return (
    <AdminLayout>
      <EditPostComponent />
    </AdminLayout>
  );
};

export default EditPost;

// import { useState, useEffect, useContext } from "react";
// import AdminLayout from "../../../components/layout/AdminLayout";
// import { Row, Col, Button, Modal, Input, Upload, Image } from "antd";
// import Editor from "rich-markdown-editor";
// import { ThemeContext } from "../../../context/theme";
// import axios from "axios";
// import { Select, Typography } from "antd";
// import { Loading3QuartersOutlined, UploadOutlined } from "@ant-design/icons";
// import Resizer from "react-image-file-resizer";
// import toast from "react-hot-toast";
// import Media from "../../../components/media/Media";
// import { MediaContext } from "../../../context/media";
// import { useRouter } from "next/router";
// import { uploadImage } from "../../../functions/upload";

// const { Text } = Typography;

// const { Option } = Select;

// // const EditPost = ({ post }) => {
// const EditPost = ({ post }) => {
//   // hooks
//   const [theme, setTheme] = useContext(ThemeContext);
//   const [media, setMedia] = useContext(MediaContext);
//   const router = useRouter();
//   // state
//   // const [title, setTitle] = useState(post?.title);
//   // const [content, setContent] = useState(post?.content);
//   const [title, setTitle] = useState("");
//   const [content, setContent] = useState("");
//   const [postId, setPostId] = useState("");
//   const [categories, setCategories] = useState([]); // useEffect populated the names
//   // const [featuredImage, setFeaturedImage] = useState(post?.featuredImage);
//   const [featuredImage, setFeaturedImage] = useState({});
//   const [visible, setVisible] = useState(false);
//   const [loading, setLoading] = useState(false);
//   const [loadedCatetories, setLoadedCatetories] = useState([]);

//   const { slug } = router.query;

//   console.log(
//     "content ----------------------------------------------------------------------------------> ",
//     content
//   );

//   useEffect(() => {
//     loadPost();
//   }, [slug]);

//   useEffect(() => {
//     loadCategories();
//   }, []);

//   const loadPost = async () => {
//     try {
//       setLoading(true);
//       const { data } = await axios.get(`/post/${slug}`);
//       const { title, content, featuredImage } = data;
//       // console.log("LOAD POST => ", data);
//       setTitle(title);
//       setContent(content);
//       setFeaturedImage(featuredImage);
//       setPostId(data._id);
//       // push category names
//       let arr = [];
//       data.categories.map((c) => arr.push(c.name));
//       setCategories(arr);
//       setLoading(false);
//     } catch (err) {
//       console.log(err);
//       setLoading(false);
//     }
//   };

//   const loadCategories = async () => {
//     try {
//       const { data } = await axios.get("/categories");
//       setLoadedCatetories(data);
//     } catch (err) {
//       console.log(err);
//     }
//   };

//   const handlePublish = async () => {
//     try {
//       setLoading(true);
//       const { data } = await axios.put(`/post/${postId}`, {
//         title,
//         content,
//         categories,
//         featuredImage: media?.selected?._id
//           ? media.selected._id
//           : featuredImage?._id
//           ? featuredImage._id
//           : undefined,
//       });
//       // console.log("POST UPDATED => ", data);
//       if (data?.error) {
//         toast.error(data.error);
//         setLoading(false);
//       } else {
//         toast.success("Post updated successfully");
//         setMedia({ ...media, selected: null });
//         router.push("/admin/posts");
//       }
//     } catch (err) {
//       console.log(err);
//       toast.error("Post creupdateate failed. Try again.");
//       setLoading(false);
//     }
//   };

//   return (
//     <AdminLayout>
//       <Row>
//         <Col sm={22} lg={14} offset={1}>
//           <h4 style={{ marginBottom: "-10px" }}>Update Post</h4>
//           {/* <pre>{JSON.stringify(media, null, 4)}</pre> */}
//           <Input
//             style={{ margin: "20px 0px 20px 0px" }}
//             size="large"
//             placeholder="Give it a title"
//             value={title}
//             onChange={(e) => setTitle(e.target.value)}
//           />

//           {loading ? (
//             "Loading..."
//           ) : (
//             <Editor
//               style={{ width: "100%" }}
//               dark={theme === "light" ? false : true}
//               defaultValue={content}
//               uploadImage={uploadImage}
//               onChange={(v) => setContent(v())}
//             />
//           )}
//         </Col>
//         <Col sm={22} lg={6} offset={1}>
//           <Button
//             type="default"
//             htmlType="submit"
//             style={{ margin: "10px 0px 10px 0" }}
//             onClick={() => setVisible(true)}
//           >
//             Preview
//           </Button>

//           <h4>Categories</h4>
//           <Select
//             mode="multiple"
//             allowClear
//             style={{ width: "100%" }}
//             placeholder="Please select"
//             onChange={(v) => setCategories(v)}
//             value={[...categories]}
//           >
//             {loadedCatetories.map((item) => (
//               <Option key={item.name}>{item.name}</Option>
//             ))}
//           </Select>

//           {/* show selected/featured image */}
//           {media.selected ? (
//             <>
//               <div style={{ marginBottom: 15 }}></div>

//               <Image width="100%" src={media.selected.url} />
//             </>
//           ) : featuredImage ? (
//             <>
//               <div style={{ marginBottom: 15 }}></div>

//               <Image width="100%" src={featuredImage.url} />
//             </>
//           ) : (
//             ""
//           )}

//           {/* <Upload onChange={handleFileChange} multiple={false} maxCount={1}> */}
//           <Button
//             // onClick={() => setVisibleMedia(true)}
//             onClick={() => setMedia({ ...media, showMediaModal: true })}
//             style={{ marginTop: 10 }}
//             icon={<UploadOutlined />}
//             block
//           >
//             Featured Image
//           </Button>
//           {/* </Upload> */}

//           <Button
//             onClick={handlePublish}
//             type="default"
//             htmlType="submit"
//             style={{ margin: "10px 0px 10px 0" }}
//             loading={loading}
//             block
//           >
//             Update
//           </Button>
//           {/* for post preview */}
//           <Modal
//             title="Preview"
//             centered
//             visible={visible}
//             onOk={() => setVisible(false)}
//             onCancel={() => setVisible(false)}
//             width={720}
//             footer={null}
//           >
//             <h1>{title}</h1>
//             <img style={{ width: "100%" }} src={media.selected?.url} />
//             <Editor
//               dark={theme === "light" ? false : true}
//               value={content}
//               readOnly={true}
//             />
//           </Modal>
//           {/* for media management */}
//           <Modal
//             title="Media"
//             // centered
//             style={{ top: 20 }}
//             visible={media.showMediaModal}
//             onOk={() => setMedia({ ...media, showMediaModal: false })}
//             onCancel={() => setMedia({ ...media, showMediaModal: false })}
//             width={720}
//             footer={null}
//           >
//             <Media />
//           </Modal>
//         </Col>
//       </Row>
//     </AdminLayout>
//   );
// };

// // export async function getServerSideProps({ params }) {
// //   const { data } = await axios.get(`${process.env.API}/post/${params.slug}`);
// //   return {
// //     props: {
// //       post: data,
// //     },
// //   };
// // }

// export default EditPost;
