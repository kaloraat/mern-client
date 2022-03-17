import AuthorLayout from "../../../components/layout/AuthorLayout";
import { Row, Col } from "antd";
import MediaLibrary from "../../../components/media/MediaLibrary";

const Library = () => {
  return (
    <AuthorLayout>
      <Row>
        <Col span={24}>
          <MediaLibrary page="author" />
        </Col>
      </Row>
    </AuthorLayout>
  );
};

export default Library;
