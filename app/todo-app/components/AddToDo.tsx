"use client"; // This directive ensures that this code runs on the client side.
import React, { useState, useEffect } from "react"; // Import React and necessary hooks.
import style from "../../styles/style"; // Import custom styles.
import { signOut } from "firebase/auth"; // Import signOut function from Firebase authentication.
import { auth } from "../../lib/firebase/clientApp"; // Import Firebase authentication instance.
import { useRouter } from "next/navigation"; // Import useRouter hook for navigation.
import { db } from "../../lib/firebase/clientApp"; // Import Firebase database instance.
import {
  addDoc,
  collection,
  getDocs,
  updateDoc,
  deleteDoc,
  doc,
} from "firebase/firestore"; // Import Firestore functions for CRUD operations.
import useAuth from "@/app/lib/hooks/useAuth"; // Custom hook to get authenticated user.

const AddToDo = () => {
  const [todos, setTodos] = useState<any[]>([]); // State to store todos.
  const [loading, setLoading] = useState<boolean>(false); // State to handle loading indicator.
  const [editingTodo, setEditingTodo] = useState<string | null>(null); // State to store the ID of the todo being edited.
  const [editText, setEditText] = useState<string>(""); // State to store the new text for the todo being edited.
  const router = useRouter(); // Router instance for navigation.
  const user = useAuth(); // Custom hook to get the current user, returns user info or null.

  useEffect(() => {
    if (user) {
      // If user is authenticated.
      setLoading(true); // Set loading to true.
      const fetchTodos = async () => {
        try {
          const toDoRef = collection(db, "users", user.uid, "todos"); // Reference to user's todos collection in Firestore.
          const querySnapshot = await getDocs(toDoRef); // Fetch all todos from Firestore.
          const todosData = querySnapshot.docs.map((doc) => ({
            ...doc.data(),
            id: doc.id,
          })); // Map the fetched data to include the document ID.
          setTodos(todosData); // Update the state with fetched todos.
        } catch (error) {
          console.log(error); // Log any errors.
        } finally {
          setLoading(false); // Set loading to false once fetching is done.
        }
      };

      fetchTodos(); // Call the function to fetch todos.
    }
  }, [user]); // Dependency array to run this effect when user changes.

  /**
   * Handles form submission to add a new todo to Firestore.
   * @param e Submit event used to create todo object data.
   */
  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault(); // Prevent default form submission.
    let todo = e.currentTarget.todo.value; // Get the todo value from the input.
    let toDoObj = {
      todo: todo,
      dateCreated: new Date(),
      timestamp: new Date().getTime(),
      completed: false,
    }; // Create a new todo object with necessary properties.

    const toDoRef = collection(db, "users", user?.uid, "todos"); // Reference to user's todos collection in Firestore.

    setLoading(true); // Set loading to true.
    try {
      const docRef = await addDoc(toDoRef, toDoObj); // Add new todo to Firestore and get the document reference.
      setTodos([...todos, { ...toDoObj, id: docRef.id }]); // Update local state with new todo including its Firestore ID.
    } catch (error) {
      console.log(error); // Log any errors.
    } finally {
      setLoading(false); // Set loading to false.
      // Reset input and refocus
      (document.getElementById("todo-input") as HTMLInputElement).value = ""; // Clear the input field.
      (document.getElementById("todo-input") as HTMLInputElement).focus(); // Refocus the input field.
    }
  }

  /**
   * Toggles the completion status of a todo and deletes it if completed.
   * @param todo The todo object to update.
   */
  async function handleTodoCompletion(todo: any) {
    try {
      const todoRef = doc(db, "users", user?.uid, "todos", todo.id); // Reference to the specific todo document in Firestore.
      const updatedTodo = { ...todo, completed: !todo.completed }; // Create an updated todo object with toggled completion status.

      if (updatedTodo.completed) {
        await deleteDoc(todoRef); // Delete the todo from Firestore if it's completed.
        setTodos(todos.filter((t) => t.id !== todo.id)); // Update the state to remove the deleted todo.
      } else {
        await updateDoc(todoRef, { completed: updatedTodo.completed }); // Update the completion status in Firestore.
        setTodos(todos.map((t) => (t.id === todo.id ? updatedTodo : t))); // Update the state with the updated todo.
      }
    } catch (error) {
      console.log(error); // Log any errors.
    }
  }

  /**
   * Starts the editing process for a todo.
   * @param todo The todo object to edit.
   */
  function handleEditStart(todo: any) {
    setEditingTodo(todo.id); // Set the editing todo ID.
    setEditText(todo.todo); // Set the current text in the input field.
  }

  /**
   * Saves the edited todo to Firestore and updates the state.
   * @param todo The todo object to update.
   */
  async function handleEditSave(todo: any) {
    if (editText.trim() === "") return; // Prevent saving empty todos.

    try {
      const todoRef = doc(db, "users", user?.uid, "todos", todo.id); // Reference to the specific todo document in Firestore.
      await updateDoc(todoRef, { todo: editText }); // Update the todo text in Firestore.

      setTodos(
        todos.map((t) => (t.id === todo.id ? { ...t, todo: editText } : t))
      ); // Update the state with the edited todo.
      setEditingTodo(null); // Exit edit mode.
      setEditText(""); // Clear the edit text state.
    } catch (error) {
      console.log(error); // Log any errors.
    }
  }

  return (
    <div className="flex justify-center flex-col gap-5">
      <form onSubmit={handleSubmit} className="flex justify-center mt-3 mb-3">
        <input
          type="text"
          name="todo"
          placeholder="Enter todo"
          className={`${style.inputStyles.lightThemeInput}`}
          id="todo-input"
        />
        <button
          type="submit"
          className={`${style.buttonStyles.lightThemeButton} ml-2`}
        >
          Submit
        </button>
      </form>

      <button
        className="fadeUp3 text-neutral-400 hover:text-black"
        onClick={() =>
          signOut(auth).then(() => {
            router.push("/");
          })
        }
      >
        Sign out
      </button>

      <div className="flex justify-center flex-col">
        {loading ? (
          <p>Loading...</p>
        ) : (
          todos.map((todo: any) => (
            <div
              key={todo.id}
              className={`fadeUp1 ${style.todoStyles.lightThemeTodo}`}
            >
              {editingTodo === todo.id ? (
                <input
                  type="text"
                  value={editText}
                  onChange={(e) => setEditText(e.target.value)}
                  onBlur={() => handleEditSave(todo)} // Save when the input loses focus.
                  onKeyDown={(e) => {
                    if (e.key === "Enter") handleEditSave(todo); // Save when Enter is pressed.
                  }}
                  className={`${style.inputStyles.lightThemeInput} text-[1.2rem]`}
                />
              ) : (
                <p
                  className="select-none cursor-pointer"
                  onClick={() => handleEditStart(todo)}
                >
                  {todo.todo}
                </p>
              )}
              <div
                className={`cursor-pointer p-2 max-w-[16px] max-h-[16px] border border-1 border-black bg-${
                  todo.completed ? "black" : "white"
                } rounded-full hover:bg-black duration-150`}
                onClick={() => handleTodoCompletion(todo)}
              ></div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default AddToDo;
