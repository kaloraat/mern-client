import AuthorLayout from "../../../components/layout/AuthorLayout";
import EditPostComponent from "../../../components/posts/EditPostComponent";

const EditPost = () => {
  return (
    <AuthorLayout>
      <EditPostComponent page="author" />
    </AuthorLayout>
  );
};

export default EditPost;
