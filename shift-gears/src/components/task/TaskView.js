import PropTypes from "app/prop-types";
import styles from "./TaskView.module.css";
import { Card, Popconfirm } from "antd";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import TaskPriorityIcon from "./TaskPriorityIcon";

const propTypes = {
  task: PropTypes.Task.isRequired,
  onEdit: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
};

const TaskView = (props) => (
  <Card
    hoverable
    className={styles.task}
    title={props.task.title}
    extra={<TaskPriorityIcon priority={props.task.priority} />}
    actions={[
      <EditOutlined
        key="edit"
        className={styles.icon}
        onClick={props.onEdit}
      />,

      <Popconfirm
        key="delete"
        title="Are you sure to delete this task?"
        onConfirm={props.onDelete}
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
);

TaskView.propTypes = propTypes;

export default TaskView;
