import { useEffect, useRef, useState } from "react";
import Todo from "./components/Todo";

function App() {
  const [showFinished, setShowFinished] = useState(false);
  const [id, setId] = useState(3);
  const [todos, setTodos] = useState([
    {
      id: 1,
      title: "Exercise",
      finished: true,
    },
    {
      id: 2,
      title: "Code",
      finished: false,
    },
  ]);

  const addTaskInput = useRef();

  useEffect(() => {
    console.log(todos);
  }, [todos]);

  const addTodo = () => {
    setTodos([
      ...todos,
      {
        id: id,
        title: addTaskInput.current.value,
        finished: false,
      },
    ]);
    setId(id + 1);
    addTaskInput.current.value = "";
  };

  return (
    <>
      <div className="w-full min-h-[100vh] flex justify-center items-center">
        <div className="text-[var(--primary-color)] w-md">
          <h1 className="font-bold text-3xl mb-8">Todo List</h1>
          <div className="flex gap-2 items-center mb-2">
            <input
              type="checkbox"
              id="finished"
              checked={showFinished}
              onChange={() => {
                setShowFinished(!showFinished);
              }}
            />
            <label htmlFor="finished" className="select-none">
              Show finished
            </label>
          </div>
          <div className="flex gap-4">
            <input
              type="text"
              placeholder="Add new task"
              ref={addTaskInput}
              className="border-b-2 border-b-gray-400 w-sm outline-none font-medium placeholder:font-medium placeholder:text-gray-400 px-2"
            />
            <button
              onClick={addTodo}
              className="bg-[var(--primary-color)] flex justify-center items-center rounded-xl aspect-square w-10 cursor-pointer"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 stroke-white"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M12 4v16m8-8H4"
                ></path>
              </svg>
            </button>
          </div>
          <div className="flex flex-col gap-4 mt-4">
            {todos.map((todo) => {
              return <Todo key={todo.id} todo={todo} />;
            })}
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
