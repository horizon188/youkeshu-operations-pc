import { Modal, Form, Input, Button } from "antd";
import React, { useState, useEffect } from "react";

function name(params) {
  const [form] = Form.useForm();
  let { onCancel, initialValues, onOk, visible, actionType } = params;
  // const [visible, setVisible] = useState(params.visible);
  // useEffect(() => {
  //   setVisible(params.visible);
  // }, [params.visible]);
  const handleOk = () => {
    form.validateFields().then((values) => {
      console.log("vvv", values);
      onOk(values);
    });
  };
  const handleCancel = () => {
    // setVisible(false);
    onCancel();
  };
  console.log("initialValues", initialValues);
  let title = {
    add: "新增",
    detail: "详情",
    edit: "编辑",
  };
  return (
    <Modal
      title={title[actionType]}
      visible={visible}
      onOk={handleOk}
      onCancel={handleCancel}
      className={"modal"}
      // destroyOnClose={true}
      cancelText="取消"
      okText="确定"
    >
      <Form
        // onFinish={onFinish}
        // preserve={false}
        form={form}
        initialValues={initialValues}
      >
        <Form.Item
          name="name"
          label="名称"
          rules={[{ required: true, message: "名称不能为空" }]}
        >
          <Input
            style={{ width: "224px" }}
            disabled={actionType === "detail"}
          />
        </Form.Item>
        <Form.Item
          name="age"
          label="年龄"
          rules={[{ required: true, message: "年龄不能为空" }]}
        >
          <Input
            style={{ width: "224px" }}
            disabled={actionType === "detail"}
          />
        </Form.Item>
        <Form.Item
          name="address"
          label="地址"
          rules={[{ required: true, message: "地址不能为空" }]}
        >
          <Input
            style={{ width: "224px" }}
            disabled={actionType === "detail"}
          />
        </Form.Item>
      </Form>
    </Modal>
  );
}

export default name;
