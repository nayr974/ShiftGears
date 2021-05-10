import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Modal, Card, Popconfirm } from "antd";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { Draggable } from "react-beautiful-dnd";

import { updateTask, deleteTaskById } from "app/taskBoardSlice";
import PropTypes from "app/prop-types";
import styles from "./Task.module.css";
import TaskEdit from "./TaskEdit";
import TaskPriorityIcon from "./TaskPriorityIcon";

const propTypes = {
  task: PropTypes.Task.isRequired,
  taskIndex: PropTypes.number.isRequired,
};

const defaultProps = {};

const Task = (props) => {
  const dispatch = useDispatch();
  const [editing, setEditing] = useState(false);

  return (
    <Draggable draggableId={props.task.id} index={props.taskIndex}>
      {(provided, snapshot) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
        >
          <Card
            hoverable
            className={styles.task}
            title={props.task.title}
            extra={<TaskPriorityIcon priority={props.task.priority} />}
            actions={[
              <EditOutlined
                key="edit"
                className={styles.icon}
                onClick={() => setEditing(true)}
              />,

              <Popconfirm
                key="delete"
                title="Are you sure to delete this task?"
                onConfirm={() => dispatch(deleteTaskById(props.task.id))}
                okText="Yes"
                cancelText="No"
              >
                <DeleteOutlined className={styles.icon} />
              </Popconfirm>,
            ]}
          >
            {
              // TODO: Ensure sanitization of HTML using "DOMPurify" or similar to mitigate attacks, before *dangerously* setting it or originally saving it!
            }
            <div
              dangerouslySetInnerHTML={{
                __html: props.task.content,
              }}
            />
          </Card>
          <Modal
            title="Edit Task"
            visible={editing}
            width="50vw"
            onCancel={() => setEditing(false)}
            footer={null}
          >
            <TaskEdit
              task={props.task}
              updateTask={(values) => {
                dispatch(updateTask(values));
                setEditing(false);
              }}
            />
          </Modal>
        </div>
      )}
    </Draggable>
  );
};

Task.propTypes = propTypes;
Task.defaultProps = defaultProps;

export default Task;
