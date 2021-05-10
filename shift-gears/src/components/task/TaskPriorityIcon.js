import PropTypes from "app/prop-types";
import styles from "./TaskPriorityIcon.module.css";

const propTypes = {
  priority: PropTypes.string.isRequired,
  small: PropTypes.bool,
};

const defaultProps = {
  small: false,
};

const TaskPriorityIconPath = (priority) =>
  ({
    HIGH: "/img/high.svg",
    MEDIUM: "/img/medium.svg",
    LOW: "/img/low.svg",
  }[priority]);

const TaskPriorityIcon = (props) =>
  props.priority && (
    <img
      className={props.small ? styles.small : styles.large}
      src={TaskPriorityIconPath(props.priority)}
      alt="Priority"
    />
  );

TaskPriorityIcon.propTypes = propTypes;
TaskPriorityIcon.defaultProps = defaultProps;

export default TaskPriorityIcon;
