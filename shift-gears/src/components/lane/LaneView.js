import React, { useState } from "react";
import PropTypes from "app/prop-types";
import styles from "./LaneView.module.css";
import Task from "components/task/Task";
import { Typography, Popconfirm } from "antd";
import { DeleteOutlined } from "@ant-design/icons";
import AddButtonOutlined from "components/common/AddButtonOutlined";

const propTypes = {
  lane: PropTypes.Lane.isRequired,
  isDraggingOver: PropTypes.bool,
  onEdit: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
};

const defaultProps = {
  isDraggingOver: false,
};

const { Title, Paragraph } = Typography;

const LaneView = (props) => {
  const [editing, setEditing] = useState(false);

  return (
    <div
      className={
        props.isDraggingOver ? styles.dragCenterLine : styles.centerLine
      }
    >
      <div className={styles.laneHeader}>
        <Title level={4} className={styles.title}>
          <Paragraph
            editable={{
              maxLength: 30,
              onChange: props.onEdit,
              onStart: () => setEditing(true),
              onEnd: () => setEditing(false),
            }}
          >
            {props.lane.title}
          </Paragraph>
        </Title>
        {!editing && (
          <Popconfirm
            key="delete"
            title="Are you sure to delete this lane?"
            onConfirm={props.onDelete}
            okText="Yes"
            cancelText="No"
          >
            <DeleteOutlined className={styles.delete} />
          </Popconfirm>
        )}
      </div>
      {props.lane.tasks?.map((task, index) => (
        <Task key={task.id} task={task} taskIndex={index} />
      ))}
      <AddButtonOutlined label="Add another task" onClick={props.onAdd} />
    </div>
  );
};

LaneView.propTypes = propTypes;
LaneView.defaultProps = defaultProps;

export default LaneView;
