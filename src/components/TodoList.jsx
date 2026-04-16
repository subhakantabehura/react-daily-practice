function TodoList() {
  const initialTasks = [
    { id: 1, text: "Learn React Fundamentals  " },
    { id: 2, text: "Build a User Dashboard  " },
    { id: 3, text: "Master State Management  " },
    { id: 4, text: "Conquer Lists & Keys  " }
  ];

  return (
    <div >
      <h2>My Todo List  </h2>

      <ul>
        {initialTasks.map((task) => (
          <li
            key={task.id}>
            <span>{task.text}</span>
            <button>
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default TodoList;
