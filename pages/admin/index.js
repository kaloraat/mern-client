import { Row, Col, Divider } from "antd";
import AdminLayout from "../../components/layout/AdminLayout";
import RenderProgress from "../../components/pages/RenderProgress";
import useNumbers from "../../hooks/useNumbers";

const Admin = () => {
  const { numbers } = useNumbers();

  return (
    <AdminLayout>
      {/* stats */}
      <Row>
        <Col span={24}>
          <Divider>
            <h1>Statistics</h1>
          </Divider>
        </Col>
      </Row>
      {/* progress numbers */}
      <Row>
        <Col
          span={12}
          style={{ marginTop: 100, textAlign: "center", fontSize: 20 }}
        >
          <RenderProgress
            number={numbers.posts}
            name="Posts"
            link="/admin/posts"
          />
        </Col>
        <Col
          span={12}
          style={{ marginTop: 100, textAlign: "center", fontSize: 20 }}
        >
          <RenderProgress
            number={numbers.categories}
            name="Categories"
            link="/admin/categories"
          />
        </Col>
        <Col
          span={12}
          style={{ marginTop: 100, textAlign: "center", fontSize: 20 }}
        >
          <RenderProgress
            number={numbers.comments}
            name="Comments"
            link="/admin/comments"
          />
        </Col>
        <Col
          span={12}
          style={{ marginTop: 100, textAlign: "center", fontSize: 20 }}
        >
          <RenderProgress
            number={numbers.users}
            name="Users"
            link="/admin/users"
          />
        </Col>
      </Row>
    </AdminLayout>
  );
};

export default Admin;
