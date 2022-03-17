import { Row, Col } from "antd";
import ContactForm from "../components/forms/ContactForm";

const Contact = () => {
  return (
    <Row>
      <Col span={12} offset={6} style={{ paddingTop: "10%" }}>
        <ContactForm />
      </Col>
    </Row>
  );
};

export default Contact;
