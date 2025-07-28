import React, { useEffect, useState } from "react";

export default function Todo({
  todos,
  todo,
  addTaskInput,
  editTodo,
  removeTodo,
  saveToLocalStorage,
}) {
  const [finished, setFinished] = useState(todo.finished);

  useEffect(() => {
    todo.finished = finished;
    saveToLocalStorage(todos);
  }, [finished, todo, todos]);

  return (
    <div className="border border-[var(--primary-color)] rounded-2xl p-4 flex justify-between gap-2">
      <input
        type="checkbox"
        checked={finished}
        onChange={() => {
          setFinished(!finished);
        }}
        className="min-w-5"
      />
      <p
        className={`grow font-medium ${
          finished && "line-through text-gray-400"
        }`}
      >
        {todo.title}
      </p>
      <button
        onClick={() => {
          editTodo(todo);
          addTaskInput.current.focus();
        }}
        className="cursor-pointer"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 -960 960 960"
          className="aspect-square w-6 fill-[var(--primary-color)]"
        >
          <path d="M200-200h57l391-391-57-57-391 391v57Zm-80 80v-170l528-527q12-11 26.5-17t30.5-6q16 0 31 6t26 18l55 56q12 11 17.5 26t5.5 30q0 16-5.5 30.5T817-647L290-120H120Zm640-584-56-56 56 56Zm-141 85-28-29 57 57-29-28Z" />
        </svg>
      </button>
      <button onClick={() => removeTodo(todo)} className="cursor-pointer">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 -960 960 960"
          className="aspect-square w-6 fill-[var(--primary-color)]"
        >
          <path d="m256-200-56-56 224-224-224-224 56-56 224 224 224-224 56 56-224 224 224 224-56 56-224-224-224 224Z" />
        </svg>
      </button>
    </div>
  );
}
