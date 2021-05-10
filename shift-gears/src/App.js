import React from "react";
import "./App.css";
import TaskBoard from "components/task-board/TaskBoard";

function App() {
  return (
    <div className="App">
      <div className="AppContainer">
        <TaskBoard />
      </div>
    </div>
  );
}

export default App;
