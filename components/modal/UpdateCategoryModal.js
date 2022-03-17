import React, { useState, useEffect } from "react";
import { Modal, Button, Form, Input } from "antd";
import { EditOutlined } from "@ant-design/icons";

const UpdateCategoryModal = ({
  visible,
  setVisible,
  handleUpdate,
  loading,
  updatingCategory,
}) => {
  const [form] = Form.useForm();
  // Ant design form input default values and clear values
  return (
    <>
      <Modal
        title="Update Category"
        visible={visible}
        form={form}
        onOk={() => setVisible(false)}
        onCancel={() => setVisible(false)}
        footer={null}
      >
        <Form
          onFinish={handleUpdate}
          fields={[
            {
              name: ["name"],
              value: updatingCategory.name,
            },
          ]}
        >
          <Form.Item
            name="name"
            rules={[
              {
                required: true,
                message: "Name is required",
              },
            ]}
            hasFeedback
          >
            <Input prefix={<EditOutlined />} placeholder="Name" />
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" loading={loading}>
              Update
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default UpdateCategoryModal;
