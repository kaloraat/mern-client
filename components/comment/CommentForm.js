import { useContext } from "react";
import { Input, Button } from "antd";
import { AuthContext } from "../../context/auth";
import Link from "next/link";

const { TextArea } = Input;

const CommentForm = ({ handleSubmit, comment, setComment, loading }) => {
  // context
  const [auth, setAuth] = useContext(AuthContext);

  console.log(auth);
  return (
    <>
      <TextArea
        value={comment}
        onChange={(e) => setComment(e.target.value)}
        disabled={auth.user === null && auth.token === ""}
        rows={4}
        placeholder="Leave a comment"
        maxLength={200}
      />
      <Button
        onClick={handleSubmit}
        disabled={(auth.user === null && auth.token === "") || comment === ""}
        type="primary"
        loading={loading}
        style={{ marginTop: 4 }}
      >
        Post
      </Button>
    </>
  );
};

export default CommentForm;
