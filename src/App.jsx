import { useEffect, useRef, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import Todo from "./components/Todo";

function App() {
  const [showFinished, setShowFinished] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [editTodoId, setEditTodoId] = useState("");
  const [todos, setTodos] = useState([]);

  const addTaskInput = useRef();

  useEffect(() => {
    if (localStorage.getItem("todos"))
      setTodos(JSON.parse(localStorage.getItem("todos")));
  }, []);

  useEffect(() => {
    console.log(todos);
  }, [todos]);

  const saveToLocalStorage = (todos) => {
    localStorage.setItem("todos", JSON.stringify(todos));
  };

  const addTodo = () => {
    setTodos([
      ...todos,
      {
        id: uuidv4(),
        title: addTaskInput.current.value,
        finished: false,
      },
    ]);
    saveToLocalStorage(todos);
    addTaskInput.current.value = "";
  };

  const editTodo = (todoToEdit) => {
    setIsEditing(true);
    setEditTodoId(todoToEdit.id);
    addTaskInput.current.value = todoToEdit.title;
  };

  const saveEditedTodo = () => {
    setIsEditing(false);
    todos.forEach((todo) => {
      if (todo.id === editTodoId) {
        todo.title = addTaskInput.current.value;
        addTaskInput.current.value = "";
      }
    });
    saveToLocalStorage(todos);
  };

  const removeTodo = (todoToRemove) => {
    let newTodos = todos.filter((todo) => {
      if (todo.id != todoToRemove.id) {
        return todo;
      }
    });
    setTodos(newTodos);
    saveToLocalStorage(todos);
  };

  const todoElement = (todo) => {
    return (
      <Todo
        key={todo.id}
        todos={todos}
        todo={todo}
        addTaskInput={addTaskInput}
        editTodo={editTodo}
        removeTodo={removeTodo}
        saveToLocalStorage={saveToLocalStorage}
      />
    );
  };

  return (
    <>
      <div className="w-full min-h-[100vh] flex justify-center items-center">
        <div className="text-[var(--primary-color)] w-md m-8">
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
              name="todo"
              placeholder="Add new task"
              ref={addTaskInput}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  if (!isEditing && addTaskInput.current.value !== "")
                    addTodo();
                  if (isEditing) saveEditedTodo();
                }
              }}
              className="border-b-2 border-b-gray-400 max-w-sm w-full outline-none font-medium placeholder:font-medium placeholder:text-gray-400 px-2"
            />
            <button
              onClick={() => {
                if (!isEditing && addTaskInput.current.value !== "") addTodo();
                if (isEditing) saveEditedTodo();
              }}
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
            {showFinished
              ? todos.map((todo) => {
                  return todoElement(todo);
                })
              : todos
                  .filter((todo) => {
                    if (!todo.finished) {
                      return todo;
                    }
                  })
                  .map((todo) => {
                    return todoElement(todo);
                  })}
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
