import AuthorLayout from "../../../components/layout/AuthorLayout";
import { Row, Col } from "antd";
import UploadFile from "../../../components/media/UploadFile";

const NewMedia = () => {
  return (
    <AuthorLayout>
      <Row>
        <Col span={24}>
          <div
            style={{
              padding: 100,
              textAlign: "center",
            }}
          >
            <UploadFile redirectToLibrary={true} page="author" />
          </div>
        </Col>
      </Row>
    </AuthorLayout>
  );
};

export default NewMedia;
