import React from "react";
import AddToDo from "./components/AddToDo";

const ToDoAppComponent = () => {
  return (
    <div className="p-5 container max-w-full h-screen flex flex-col items-center gap-20">
      <h1 className="fadeUp1 mt-[5%] text-[2rem] font-semibold">
        Start Adding Todos!
      </h1>
      <AddToDo />
    </div>
  );
};

export default ToDoAppComponent;
