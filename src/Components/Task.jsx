import React from "react";

const TaskList = ({ tasks = [], onDelete }) => {
  if (!tasks.length) {
    return <p>No tasks available</p>;
  }

  return (
    <ul>
      {tasks.map((task, index) => (
        <li key={index}>
          {task}
          <button onClick={() => onDelete(task)}>Delete</button>
        </li>
      ))}
    </ul>
  );
};

export default TaskList;
