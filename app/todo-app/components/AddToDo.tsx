"use client";
import React, { useState, useEffect } from "react";
import style from "../../styles/style";
import { signOut } from "firebase/auth";
import { auth } from "../../lib/firebase/clientApp";
import { useRouter } from "next/navigation";

const AddToDo = () => {
  const [todos, settodos] = useState<any[]>([]);
  const router = useRouter();

  console.log(todos);

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    let todo = e.currentTarget.todo.value;
    let toDoObj = {
      todo: todo,
      dateCreated: new Date(),
      timestamp: new Date().getTime(),
      completed: false,
    };

    //this will insert the toDoObj into the todos array
    settodos([...todos, toDoObj]);
    e.currentTarget.reset();
  }

  function handleTodo(timestamp: number) {
    // Create a new array with the updated todos
    const updatedTodos = todos.map((todo) =>
      todo.timestamp === timestamp
        ? { ...todo, completed: !todo.completed }
        : todo
    );

    // Update the state with the new todos array
    settodos(updatedTodos);
  }

  function handleSignOut() {
    signOut(auth);
    router.push("/");
  }

  useEffect(() => {
    // Filter out completed todos
    const activeTodos = todos.filter((todo) => !todo.completed);
    if (activeTodos.length !== todos.length) {
      settodos(activeTodos);
    }
  }, [todos]);

  return (
    <>
      <div className="flex flex-col gap-5">
        <form className="fadeUp2 flex gap-5" onSubmit={handleSubmit}>
          <input
            className={`${style.inputStyles.lightThemeInput} text-[1.2rem]`}
            type="text"
            name="todo"
            id="todo-input"
            placeholder="Today I need to..."
            maxLength={50}
            required
          />
          <button type="submit" className={style.buttonStyles.lightThemeButton}>
            Add
          </button>
        </form>

        <button
          className="fadeUp3 text-neutral-400 hover:text-black"
          onClick={handleSignOut}
        >
          Sign Out
        </button>
      </div>

      <div className="fadeUp3 w-[30%]">
        {todos.map((todo: any) => (
          <div
            key={todo.timestamp}
            className={`fadeUp1 ${style.todoStyles.lightThemeTodo}`}
          >
            <p className="select-none">{todo.todo}</p>
            <div
              className={`cursor-pointer p-2 max-w-[16px] max-h-[16px] border border-1 border-black bg-${
                todo.completed ? "black" : "white"
              } rounded-full hover:bg-black duration-150`}
              onClick={() => handleTodo(todo.timestamp)}
            ></div>
          </div>
        ))}
      </div>
    </>
  );
};

export default AddToDo;
