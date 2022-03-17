import AdminLayout from "../../../components/layout/AdminLayout";
import { Row, Col } from "antd";
import MediaLibrary from "../../../components/media/MediaLibrary";

const Library = () => {
  return (
    <AdminLayout>
      <Row>
        <Col span={24}>
          <MediaLibrary />
        </Col>
      </Row>
    </AdminLayout>
  );
};

export default Library;
