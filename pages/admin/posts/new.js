import AdminLayout from "../../../components/layout/AdminLayout";
import NewPostComponent from "../../../components/posts/NewPostComponent";

const NewPost = () => {
  return (
    <AdminLayout>
      <NewPostComponent />
    </AdminLayout>
  );
};

export default NewPost;

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
// import { useRouter } from "next/router";
// import Media from "../../../components/media/Media";
// import { MediaContext } from "../../../context/media";
// import { uploadImage } from "../../../functions/upload";

// const { Text } = Typography;

// const { Option } = Select;
// const NewPost = () => {
//   // from localstorage
//   const savedTitle = () => {
//     if (process.browser) {
//       if (localStorage.getItem("post-title"))
//         return JSON.parse(localStorage.getItem("post-title"));
//     }
//   };

//   const savedContent = () => {
//     if (process.browser) {
//       if (localStorage.getItem("post-content"))
//         return JSON.parse(localStorage.getItem("post-content"));
//     }
//   };
//   // hooks
//   const [theme, setTheme] = useContext(ThemeContext);
//   const [media, setMedia] = useContext(MediaContext);
//   const router = useRouter();
//   // state
//   const [title, setTitle] = useState(savedTitle());
//   const [content, setContent] = useState(savedContent());
//   const [categories, setCatgories] = useState([]);
//   const [visible, setVisible] = useState(false);
//   // const [visibleMedia, setVisibleMedia] = useState(false);
//   const [loading, setLoading] = useState(false);
//   const [typing, setTyping] = useState(false);
//   const [loadedCatetories, setLoadedCatetories] = useState([]);

//   // console.log("TITLE", title);
//   // console.log("CONTENT", content);

//   useEffect(() => {
//     const loadCategories = async () => {
//       const { data } = await axios.get("/categories");
//       setLoadedCatetories(data);
//     };
//     loadCategories();
//   }, []);

//   const handleTitle = (e) => {
//     setTitle(e.target.value);
//     localStorage.setItem("post-title", JSON.stringify(e.target.value));
//   };

//   const handleContent = (value) => {
//     setContent(value);
//     localStorage.setItem("post-content", JSON.stringify(value));
//     setTyping(true);
//     setTimeout(() => {
//       {
//         setTyping(false);
//       }
//     }, 1000);
//   };

//   const handlePublish = async () => {
//     try {
//       setLoading(true);
//       const { data } = await axios.post("/create-post", {
//         title,
//         content,
//         categories,
//         featuredImage: media?.selected?._id,
//       });
//       // console.log("POST CREATED => ", data);
//       if (data?.error) {
//         toast.error(data.error);
//         setLoading(false);
//       } else {
//         toast.success("Post created successfully");
//         localStorage.setItem("post-title", "");
//         localStorage.setItem("post-content", "");
//         setMedia({ ...media, selected: null });
//         router.push("/admin/posts");
//       }
//     } catch (err) {
//       console.log(err);
//       toast.error("Post create failed. Try again.");
//       setLoading(false);
//     }
//   };

//   return (
//     <AdminLayout>
//       <Row>
//         <Col sm={22} lg={14} offset={1}>
//           <h4 style={{ marginBottom: "-10px" }}>Create Post</h4>
//           {/* <pre>{JSON.stringify(media, null, 4)}</pre> */}
//           <Input
//             style={{ margin: "20px 0px 20px 0px" }}
//             size="large"
//             placeholder="Give it a title"
//             value={title}
//             onChange={handleTitle}
//           />

//           <Editor
//             style={{ width: "100%" }}
//             dark={theme === "light" ? false : true}
//             placeholder="Write something..."
//             defaultValue={content}
//             // defaultValue="Write something..."
//             uploadImage={uploadImage}
//             onChange={(v) => handleContent(v())}
//           />
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

//           {typing && (
//             <>
//               <Loading3QuartersOutlined spin style={{ marginLeft: 20 }} />{" "}
//               <Text disabled>Saving draft...</Text>
//             </>
//           )}

//           <h4>Categories</h4>
//           <Select
//             mode="multiple"
//             allowClear
//             style={{ width: "100%" }}
//             placeholder="Please select"
//             onChange={(v) => setCatgories(v)}
//           >
//             {loadedCatetories.map((item) => (
//               <Option key={item.name}>{item.name}</Option>
//             ))}
//           </Select>

//           {/* show selected/featured image */}
//           {media.selected && (
//             <>
//               <div style={{ marginBottom: 15 }}></div>

//               <Image width="100%" src={media.selected.url} />
//             </>
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
//             Publish
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

// export default NewPost;
