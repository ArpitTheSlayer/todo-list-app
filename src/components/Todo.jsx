import React, { useEffect, useState } from "react";

export default function Todo({ todo }) {
  const [finished, setFinished] = useState(todo.finished);

  useEffect(() => {
    todo.finished = finished;
    console.log(todo);
  }, [finished, todo]);

  return (
    <div className="border border-[var(--primary-color)] rounded-2xl p-4 flex justify-between gap-2">
      <input
        type="checkbox"
        checked={finished}
        onChange={() => {
          setFinished(!finished);
        }}
        className="w-5"
      />
      {finished ? (
        <p className="grow font-medium line-through text-gray-400">
          {todo.title}
        </p>
      ) : (
        <p className="grow font-medium">{todo.title}</p>
      )}
      <button className="cursor-pointer">
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
