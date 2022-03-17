import { List } from "antd";
import Link from "next/link";

const PostsList = ({ posts, handleDelete, page = "admin" }) => {
  return (
    <List
      itemLayout="horizontal"
      dataSource={posts}
      renderItem={(item) => (
        <List.Item
          actions={[
            <Link href={`/${page}/posts/${item.slug}`}>
              <a>edit</a>
            </Link>,
            <a onClick={() => handleDelete(item)}>delete</a>,
          ]}
        >
          <List.Item.Meta title={item.title} />
        </List.Item>
      )}
    />
  );
};

export default PostsList;
