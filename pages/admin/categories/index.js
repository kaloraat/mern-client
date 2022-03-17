import AdminLayout from "../../../components/layout/AdminLayout";
import CategoriesComponent from "../../../components/posts/CategoriesComponent";

const Categories = () => {
  return (
    <AdminLayout>
      <CategoriesComponent />
    </AdminLayout>
  );
};

export default Categories;

// import { useState, useEffect, useContext } from "react";
// import AdminLayout from "../../../components/layout/AdminLayout";
// import { Row, Col, Typography, Form, Input, Button, List } from "antd";
// import { EditOutlined } from "@ant-design/icons";
// import axios from "axios";
// import toast from "react-hot-toast";
// import UpdateCategoryModal from "../../../components/modal/UpdateCategoryModal";
// import { useRouter } from "next/router";
// import { PostContext } from "../../../context/post";

// const Categories = () => {
//   // context
//   const [post, setPost] = useContext(PostContext);
//   const { categories } = post;
//   // state
//   const [loading, setLoading] = useState(false);
//   // state to udpate category
//   const [visible, setVisible] = useState(false);
//   const [updatingCategory, setUpdatingCategory] = useState({});
//   // hooks
//   const [form] = Form.useForm();
//   const router = useRouter();

//   useEffect(() => {
//     const getCategories = async () => {
//       try {
//         const { data } = await axios.get("/categories");
//         console.log(data);
//         setPost((prev) => ({ ...prev, categories: data }));
//       } catch (err) {
//         console.log(err);
//       }
//     };
//     // execute
//     getCategories();
//   }, []);

//   const onFinish = async (values) => {
//     try {
//       console.log(values);
//       setLoading(true);
//       const { data } = await axios.post("/category", values);
//       setPost((prev) => ({
//         ...prev,
//         categories: [...prev.categories, data],
//       }));
//       form.resetFields(["name"]);
//       setLoading(false);
//       toast.success("Category created successfully");
//     } catch (err) {
//       toast.error("Duplicate error. Try different name.");
//       console.log(err);
//       setLoading(false);
//     }
//   };

//   const handleEdit = async (item) => {
//     setVisible(true);
//     setUpdatingCategory(item);
//   };

//   const handleUpdate = async (values) => {
//     console.log(values);
//     try {
//       const { data } = await axios.put(
//         `category/${updatingCategory.slug}`,
//         values
//       );
//       const newCategories = categories.map((cat) => {
//         if (cat._id === data._id) {
//           return data;
//         }
//         return cat;
//       });
//       setPost((prev) => ({ ...prev, categories: newCategories }));
//       toast.success("Categories updated");
//       setVisible(false);
//       setUpdatingCategory({});
//     } catch (err) {
//       console.log(err);
//       toast.error("Category update failed");
//     }
//   };

//   const handleDelete = async (item) => {
//     console.log("delete", item);
//     try {
//       const { data } = await axios.delete(`/category/${item.slug}`);
//       // setCategories(categories.filter((cat) => cat.slug !== item.slug));
//       setPost((prev) => ({
//         ...prev,
//         categories: categories.filter((cat) => cat.slug !== item.slug),
//       }));
//       toast.success("Category deleted");
//     } catch (err) {
//       console.log(err);
//       toast.error("Category delete falied");
//     }
//   };

//   return (
//     <AdminLayout>
//       <Row>
//         <Col sm={22} lg={10} offset={1}>
//           <h2>Categories</h2>

//           <p>Add New Category</p>

//           <Form onFinish={onFinish} form={form}>
//             <Form.Item
//               name="name"
//               rules={[
//                 {
//                   required: true,
//                   message: "Please give it a name!",
//                 },
//               ]}
//               hasFeedback
//             >
//               <Input prefix={<EditOutlined />} placeholder="Name" />
//             </Form.Item>

//             <Form.Item>
//               <Button type="primary" htmlType="submit" loading={loading}>
//                 Create
//               </Button>
//             </Form.Item>
//           </Form>
//         </Col>

//         <Col sm={22} lg={10} offset={1}>
//           <List
//             itemLayout="horizontal"
//             dataSource={categories}
//             renderItem={(item) => (
//               <List.Item
//                 actions={[
//                   <a onClick={() => handleEdit(item)}>edit</a>,
//                   <a onClick={() => handleDelete(item)}>delete</a>,
//                 ]}
//               >
//                 <List.Item.Meta title={item.name} />
//               </List.Item>
//             )}
//           />
//         </Col>
//       </Row>

//       <UpdateCategoryModal
//         visible={visible}
//         setVisible={setVisible}
//         handleUpdate={handleUpdate}
//         loading={loading}
//         updatingCategory={updatingCategory}
//       />
//     </AdminLayout>
//   );
// };

// export default Categories;
