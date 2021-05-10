import { useSelector, useDispatch } from "react-redux";
import { selectTaskBoard, addLane, moveTask } from "app/taskBoardSlice";
import Lane from "components/lane/Lane";
import styles from "./TaskBoard.module.css";
import { DragDropContext } from "react-beautiful-dnd";
import AddButtonOutlined from "components/common/AddButtonOutlined";

const TaskBoard = () => {
  const taskBoard = useSelector(selectTaskBoard);
  const dispatch = useDispatch();

  return (
    <DragDropContext onDragEnd={(result) => dispatch(moveTask(result))}>
      <div>
        <div className={styles.header}>
          <img src={"/img/logo.png"} alt="ShiftGears Logo" />
          <div className={styles.titleContainer}>
            <span className={styles.title}>{taskBoard.title}</span>
            <span className={styles.subtitle}>{taskBoard.subtitle}</span>
          </div>
        </div>
        <div className={styles.taskboard}>
          {taskBoard.lanes?.map((lane) => (
            <Lane key={lane.id} lane={lane} />
          ))}
          <AddButtonOutlined
            label="Add another lane"
            onClick={() => dispatch(addLane())}
          />
        </div>
      </div>
    </DragDropContext>
  );
};

export default TaskBoard;
