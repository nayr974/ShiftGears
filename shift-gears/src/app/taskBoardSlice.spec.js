import taskBoardReducer, {
  updateTaskBoard,
  addTaskByLaneId,
  updateTask,
  moveTask,
  deleteTaskById,
  addLane,
  updateLane,
  deleteLaneById,
} from "./taskBoardSlice";
import { TaskPriority } from "app/models";

const mockTask = {
  id: "a",
  title: "Your task.",
  priority: TaskPriority.MEDIUM,
  content: "Do it now!",
};
const mockTaskBoard = {
  title: "ShiftGears Task Board",
  subtitle: "Revving up your productivity",
  lanes: [
    {
      id: "1",
      title: "To Do",
      tasks: [
        {
          id: "a",
          title: "one",
          priority: TaskPriority.LOW,
          content: "",
        },
        {
          id: "b",
          title: "two",
          priority: TaskPriority.MEDIUM,
          content: "",
        },
      ],
    },
    {
      id: "2",
      title: "Done",
      tasks: [],
    },
  ],
};
const initialState = {
  taskBoard: mockTaskBoard,
};

describe("counter reducer", () => {
  it("should handle initial state", () => {
    const actual = taskBoardReducer(undefined, { type: "unknown" });
    expect(actual.taskBoard.title.length).toBeGreaterThan(0);
    expect(actual.taskBoard.subtitle.length).toBeGreaterThan(0);
    expect(actual.taskBoard.lanes.length).toBeGreaterThan(0);
    expect(actual.taskBoard.lanes[0].tasks.length).toEqual(1);
  });

  it("should handle updating taskBoard", () => {
    const actual = taskBoardReducer(
      initialState,
      updateTaskBoard(mockTaskBoard)
    );
    expect(actual.taskBoard).toEqual(mockTaskBoard);
  });

  it("should handle adding a task", () => {
    const actual = taskBoardReducer(initialState, addTaskByLaneId("1"));
    expect(actual.taskBoard.lanes[0].tasks.length).toEqual(3);
  });

  it("should handle updating a Task", () => {
    const actual = taskBoardReducer(
      initialState,
      updateTask({ ...mockTask, content: "UPDATED" })
    );
    expect(actual.taskBoard.lanes[0].tasks[0].content).toEqual("UPDATED");
  });

  it("should handle moving a Task down in the same lane", () => {
    const actual = taskBoardReducer(
      initialState,
      moveTask({
        source: { droppableId: "1", index: 0 },
        destination: { droppableId: "1", index: 1 },
      })
    );
    expect(actual.taskBoard.lanes[0].tasks[0].id).toEqual("b");
    expect(actual.taskBoard.lanes[0].tasks[1].id).toEqual("a");
  });

  it("should handle moving a task up in the same lane", () => {
    const actual = taskBoardReducer(
      initialState,
      moveTask({
        source: { droppableId: "1", index: 1 },
        destination: { droppableId: "1", index: 0 },
      })
    );
    expect(actual.taskBoard.lanes[0].tasks[0].id).toEqual("b");
    expect(actual.taskBoard.lanes[0].tasks[1].id).toEqual("a");
  });

  it("should handle moving a task to a different lane", () => {
    const actual = taskBoardReducer(
      initialState,
      moveTask({
        source: { droppableId: "1", index: 1 },
        destination: { droppableId: "2", index: 0 },
      })
    );
    expect(actual.taskBoard.lanes[0].tasks[0].id).toEqual("a");
    expect(actual.taskBoard.lanes[1].tasks[0].id).toEqual("b");
  });

  it("should handle deleting a task by id", () => {
    const actual = taskBoardReducer(initialState, deleteTaskById("a"));
    expect(actual.taskBoard.lanes[0].tasks[0].id).toEqual("b");
  });

  it("should handle adding a lane", () => {
    const actual = taskBoardReducer(initialState, addLane());
    expect(actual.taskBoard.lanes.length).toEqual(3);
  });

  it("should handle updating a lane", () => {
    const actual = taskBoardReducer(
      initialState,
      updateLane({ ...mockTaskBoard.lanes[1], title: "UPDATED" })
    );
    expect(actual.taskBoard.lanes[1].title).toEqual("UPDATED");
  });

  it("should handle deleting a lane by id", () => {
    const actual = taskBoardReducer(initialState, deleteLaneById("1"));
    expect(actual.taskBoard.lanes.length).toEqual(1);
    expect(actual.taskBoard.lanes[0].id).toEqual("2");
  });
});
