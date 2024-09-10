import React, { useState, useEffect, useRef, Suspense } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addTask, deleteTask } from "./redux/actions";

const TaskList = React.lazy(() => import("../src/Components/Task"));

const App = () => {
  const [task, setTask] = useState("");
  const taskRef = useRef(null);
  const tasks = useSelector((state) => state.taskReducer.tasks);
  const dispatch = useDispatch();

  useEffect(() => {
    const storedTasks = localStorage.getItem("tasks");

    if (storedTasks) {
      try {
        const parsedTasks = JSON.parse(storedTasks);
        if (Array.isArray(parsedTasks)) {
          parsedTasks.forEach((task) => dispatch(addTask(task)));
        }
      } catch (error) {
        console.error("Error parsing tasks from localStorage:", error);
      }
    }

    return () => {
      localStorage.setItem("tasks", JSON.stringify(tasks));
    };
  }, [dispatch, tasks]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (task.trim()) {
      dispatch(addTask(task));
      setTask("");
    }
  };

  const handleDelete = (taskToDelete) => {
    dispatch(deleteTask(taskToDelete));
  };

  return (
    <div>
      <h1>Task Manager</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={task}
          onChange={(e) => setTask(e.target.value)}
          placeholder="Enter a new task"
        />
        <button type="submit">Add Task</button>
      </form>

      <div>
        <input ref={taskRef} placeholder="Uncontrolled input" />
        <button onClick={() => alert(taskRef.current.value)}>
          Show Uncontrolled Input
        </button>
      </div>

      <Suspense fallback={<div>Loading tasks...</div>}>
        <TaskList tasks={tasks} onDelete={handleDelete} />
      </Suspense>
    </div>
  );
};

export default App;
