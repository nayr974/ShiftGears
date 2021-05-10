import React, { useState } from "react";
import { Button, Input, Radio, Form, Space } from "antd";
import { SaveOutlined } from "@ant-design/icons";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";

import PropTypes from "app/prop-types";
import { TaskPriority } from "app/models";
import TaskPriorityIcon from "./TaskPriorityIcon";

const propTypes = {
  task: PropTypes.Task.isRequired,
  updateTask: PropTypes.func.isRequired,
};

const TaskEditor = (props) => {
  const [content, setContent] = useState(props.task.content);

  const [form] = Form.useForm();
  return (
    <div>
      <Form
        form={form}
        layout="vertical"
        initialValues={props.task}
        onFinish={(values) => {
          // Because the CKEditor component doesn't act like a standard input control, we
          // need to manually set the content property when the form is submitted.
          props.updateTask({ ...values, content });
        }}
      >
        <Form.Item hidden name="id" rules={[{ required: true }]} />

        <Form.Item
          label="Title:"
          name="title"
          rules={[{ required: true, max: 30 }]}
        >
          <Input value={props.task.title} />
        </Form.Item>

        <Form.Item
          label="Priority:"
          name="priority"
          rules={[{ required: true }]}
        >
          <Radio.Group size="large">
            <Radio.Button value={TaskPriority.HIGH}>
              <Space>
                <TaskPriorityIcon small priority={TaskPriority.HIGH} />
                High
              </Space>
            </Radio.Button>
            <Radio.Button value={TaskPriority.MEDIUM}>
              <Space>
                <TaskPriorityIcon small priority={TaskPriority.MEDIUM} />
                Medium
              </Space>
            </Radio.Button>
            <Radio.Button value={TaskPriority.LOW}>
              <Space>
                <TaskPriorityIcon small priority={TaskPriority.LOW} />
                Low
              </Space>
            </Radio.Button>
          </Radio.Group>
        </Form.Item>

        <Form.Item label="Details:" name="content">
          <CKEditor
            editor={ClassicEditor}
            data={content}
            onReady={(editor) => {
              editor.editing.view.change((writer) => {
                writer.setStyle(
                  "height",
                  "300px",
                  editor.editing.view.document.getRoot()
                );
              });
            }}
            onChange={(event, editor) => setContent(editor.getData())}
          />
        </Form.Item>

        <Form.Item style={{ textAlign: "right" }}>
          <Button type="primary" htmlType="submit">
            <SaveOutlined />
            Save
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

TaskEditor.propTypes = propTypes;

export default TaskEditor;
