import PropTypes from "app/prop-types";
import styles from "./Lane.module.css";
import { useDispatch } from "react-redux";
import {
  addTaskByLaneId,
  updateLane,
  deleteLaneById,
} from "app/taskBoardSlice";
import { Droppable } from "react-beautiful-dnd";
import LaneView from "./LaneView";

const propTypes = {
  lane: PropTypes.Lane.isRequired,
};

const defaultProps = {};

const Lane = (props) => {
  const dispatch = useDispatch();
  return (
    <Droppable droppableId={props.lane.id}>
      {(provided, snapshot) => (
        <div
          {...provided.droppableProps}
          ref={provided.innerRef}
          className={`${styles.lane} ${
            snapshot.isDraggingOver ? styles.dragColor : styles.laneColor
          }`}
        >
          <LaneView
            lane={props.lane}
            onAdd={() => dispatch(addTaskByLaneId(props.lane.id))}
            onEdit={(value) =>
              dispatch(updateLane({ ...props.lane, title: value }))
            }
            onDelete={() => dispatch(deleteLaneById(props.lane.id))}
          />
        </div>
      )}
    </Droppable>
  );
};

Lane.propTypes = propTypes;
Lane.defaultProps = defaultProps;

export default Lane;
