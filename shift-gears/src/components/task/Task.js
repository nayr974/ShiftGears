import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Modal } from "antd";
import { Draggable } from "react-beautiful-dnd";

import { updateTask, deleteTaskById } from "app/taskBoardSlice";
import PropTypes from "app/prop-types";
import TaskView from "./TaskView";
import TaskEdit from "./TaskEdit";

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
          <TaskView
            task={props.task}
            onEdit={() => setEditing(true)}
            onDelete={() => dispatch(deleteTaskById(props.task.id))}
          />
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
