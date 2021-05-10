import React, { useState } from "react";
import PropTypes from "app/prop-types";
import Task from "components/task/Task";
import { Typography, Popconfirm } from "antd";
import { DeleteOutlined } from "@ant-design/icons";
import styles from "./Lane.module.css";
import { useDispatch } from "react-redux";
import {
  addTaskByLaneId,
  updateLane,
  deleteLaneById,
} from "app/taskBoardSlice";
import { Droppable } from "react-beautiful-dnd";
import AddButtonOutlined from "components/common/AddButtonOutlined";

const propTypes = {
  lane: PropTypes.Lane.isRequired,
};

const { Title, Paragraph } = Typography;

const defaultProps = {};

const Lane = (props) => {
  const [editing, setEditing] = useState(false);
  const dispatch = useDispatch();
  return (
    <Droppable droppableId={props.lane.id}>
      {(provided, snapshot) => (
        <div
          {...provided.droppableProps}
          ref={provided.innerRef}
          className={`${styles.lane} ${
            snapshot.isDraggingOver ? styles.hoverColor : styles.laneColor
          }`}
        >
          <div className={styles.centerLine}>
            <div className={styles.laneHeader}>
              <Title level={4} className={styles.title}>
                <Paragraph
                  editable={{
                    maxLength: 30,
                    onChange: (value) =>
                      dispatch(updateLane({ ...props.lane, title: value })),
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
                  onConfirm={() => dispatch(deleteLaneById(props.lane.id))}
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
            <AddButtonOutlined
              label="Add another task"
              onClick={() => dispatch(addTaskByLaneId(props.lane.id))}
            />
          </div>
        </div>
      )}
    </Droppable>
  );
};

Lane.propTypes = propTypes;
Lane.defaultProps = defaultProps;

export default Lane;
