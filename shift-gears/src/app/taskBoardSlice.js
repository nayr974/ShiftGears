import { createSlice } from "@reduxjs/toolkit";
import { v4 as uuid } from "uuid";
import { TaskPriority } from "app/models";

// TODO: I'm not sure these constants and factory functions belong here, and should be moved.
const firstTask = {
  id: uuid(),
  title: "Welcome to ShiftGears!",
  priority: TaskPriority.LOW,
  content:
    "<center><img width='300px' src='https://cdn.dribbble.com/users/3347131/screenshots/6663172/smallworld.gif'/></center><br/><p>Hi! This is a simple task organizer to kick your productivity <i>into high gear</i>.</p><p>Try it out:</p><ul><li><strong>Add new tasks</strong> by clicking “Add another task” at the bottom of any lane.</li><li><strong>Edit, or delete tasks</strong> by clicking the pencil or trash can icons on that task.</li><li><strong>Move tasks around</strong> by clicking and dragging them.</li><li>You can also <strong>add, remove, and edit lanes</strong>!</li></ul>",
};

const hireRyanTask = {
  id: uuid(),
  title: "Quick, hire this guy!",
  priority: TaskPriority.HIGH,
  content: "<p>This Ryan person is <i>solid</i>. I should hire them.</p>",
};

const getDefaultTask = () => ({
  id: uuid(),
  title: "Your new task",
  priority: TaskPriority.MEDIUM,
  content:
    "<p>Click the <strong>pencil</strong> button below to edit, then describe and save your task!</p>",
});

const getDefaultLane = () => ({
  id: uuid(),
  title: "New Lane",
  tasks: [],
});

const initialState = {
  taskCounter: 0,
  taskBoard: {
    title: "ShiftGears Task Board",
    subtitle: "Revving up your productivity",
    lanes: [
      {
        id: uuid(),
        title: "To Do",
        tasks: [firstTask],
      },
      {
        id: uuid(),
        title: "Done",
        tasks: [],
      },
    ],
  },
};

// Redux Toolkit allows us to write "mutating" logic in reducers. It
// doesn't actually mutate the state because it uses the Immer library,
// which detects changes to a "draft state" and produces a brand new
// immutable state based off those changes
export const taskBoardSlice = createSlice({
  name: "taskBoard",
  initialState,
  reducers: {
    updateTaskBoard: (state, action) => {
      state.taskBoard = action.payload;
    },
    addTaskByLaneId: (state, action) => {
      state.taskCounter++;
      const lane = state.taskBoard.lanes.find(
        (lane) => lane.id === action.payload
      );
      lane.tasks.push(
        state.taskCounter === 4 ? hireRyanTask : getDefaultTask()
      );
    },
    updateTask: (state, action) => {
      // This is probably not as efficient as the task being aware of which lane it is in,
      // but seems like a nicer seperation of concern to let the reducer find it given the
      // small working dataset.
      //
      // In the end, the drag and drop library I later used wanted the column index to be in,
      // context at the task level, but I've chosen not to modify this logic.
      const lane = state.taskBoard.lanes.find((lane) =>
        lane.tasks.some((task) => task.id === action.payload.id)
      );
      const taskIndex = lane.tasks.findIndex(
        (task) => task.id === action.payload.id
      );
      lane.tasks[taskIndex] = action.payload;
    },
    // Splices task from source lane and index to target land and index.
    // Expects react-beautiful-dnd onDragEnd result shape as payload, with source
    // and destination properties.
    moveTask: (state, action) => {
      if (!action.payload?.destination) return;

      // Find indicies of each column
      const sourceLaneIndex = state.taskBoard.lanes.findIndex(
        (lane) => lane.id === action.payload.source.droppableId
      );
      const destinationLaneIndex = state.taskBoard.lanes.findIndex(
        (lane) => lane.id === action.payload.destination.droppableId
      );

      // Splice out the task that was moved
      const draggedTask = state.taskBoard.lanes[sourceLaneIndex].tasks.splice(
        action.payload.source.index,
        1
      )[0];

      // Add the task to the destination list at the the target index
      state.taskBoard.lanes[destinationLaneIndex].tasks.splice(
        action.payload.destination.index,
        0,
        draggedTask
      );
    },
    deleteTaskById: (state, action) => {
      const lane = state.taskBoard.lanes.find((lane) =>
        lane.tasks.some((task) => task.id === action.payload)
      );
      const taskIndex = lane.tasks.findIndex(
        (task) => task.id === action.payload
      );
      lane.tasks.splice(taskIndex, 1);
    },
    addLane: (state) => {
      state.taskBoard.lanes.push(getDefaultLane());
    },
    updateLane: (state, action) => {
      const laneIndex = state.taskBoard.lanes.findIndex(
        (lane) => lane.id === action.payload.id
      );
      state.taskBoard.lanes[laneIndex] = action.payload;
    },
    deleteLaneById: (state, action) => {
      const laneIndex = state.taskBoard.lanes.findIndex(
        (lane) => lane.id === action.payload
      );
      state.taskBoard.lanes.splice(laneIndex, 1);
    },
  },
});

export const {
  updateTaskBoard,
  addTaskByLaneId,
  updateTask,
  moveTask,
  deleteTaskById,
  addLane,
  updateLane,
  deleteLaneById,
} = taskBoardSlice.actions;

export const selectTaskBoard = (state) => state.taskBoard.taskBoard;

export default taskBoardSlice.reducer;
