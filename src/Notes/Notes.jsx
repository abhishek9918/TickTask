import { useContext, useEffect, useState } from "react";
import { MdLightMode } from "react-icons/md";
import { MdOutlineLightMode } from "react-icons/md";
import Modal from "./Modal";
import Table from "./Table";
// import SummaryCard from "./summaryCard";
import EmptyPage from "./EmptyPage";
import { ThemeContext } from "../store/ThemeContext";
import SummaryCard from "./summaryCard";
// import SummaryCard from "./summaryCard";

function Notes() {
  const [todos, setTodos] = useState([]);
  const [task, setTask] = useState("");
  const [status, setStatus] = useState("pending");
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState("");
  const [date, setDate] = useState("");
  const [isEdit, setIsEdit] = useState(false);
  const [editIndex, setEditIndex] = useState("");
  const [deleteIndex, setDeleteIndex] = useState("");
  const [isComplete, setIsComplete] = useState(false);
  const [allTodos, setAllTodos] = useState([]);
  const [show, setShow] = useState(false);
  const { isDarkMode, toggleDarkMode } = useContext(ThemeContext);

  function submitTodo(e) {
    e.preventDefault();
    const todoObj = {
      task,
      status,
      description,
      priority,
      date,
      isComplete,
    };
    if (isEdit) {
      const updatedTodo = [...todos];
      updatedTodo[editIndex] = todoObj;
      setTodos(updatedTodo);
      setAllTodos(updatedTodo);
    } else {
      setTodos((prev) => [todoObj, ...prev]);
      setAllTodos((prev) => [todoObj, ...prev]);
    }
    setTask("");
    setDescription("");
    setPriority("");
    setDate("");
  }
  function taskBookMark(todo, index) {
    const updateTodo = [...todos];
    const currentStatus = updateTodo[index].status;
    updateTodo[index] = {
      ...updateTodo[index],
      isComplete: currentStatus === "completed" ? false : true,
      status: currentStatus === "completed" ? "pending" : "completed",
    };
    setTodos(updateTodo);
    setAllTodos(updateTodo);
  }
  function editTodo(todo, index) {
    setIsEdit(true);
    setTask(todo.task);
    setDescription(todo.description);
    setPriority(todo.priority);
    setDate(todo.date);
    setEditIndex(index);
    setStatus(todo.status);
    setIsComplete(todo.isComplete);
  }
  function deleteTodo(index) {
    setShow(true);
    setDeleteIndex(index);
  }
  function handleDeleteTask(index) {
    const updatedTodo = todos.filter((task, id) => id !== index);
    setTodos(updatedTodo);
    setAllTodos(updatedTodo);
    setShow(false);
  }
  function handleClose() {
    setShow(false);
  }
  function sortTask(e) {
    const originalTodos = [...allTodos];
    let sortedTodos = [];
    switch (e) {
      case "completed":
        sortedTodos = originalTodos.filter(
          (todo) => todo.status.toLowerCase() === "completed"
        );
        break;
      case "pending":
        sortedTodos = originalTodos.filter(
          (todo) => todo.status.toLowerCase() === "pending"
        );
        break;
      case "all":
        sortedTodos = originalTodos;
        break;
      default:
        sortedTodos = originalTodos;
        break;
    }
    setTodos(sortedTodos);
  }
  function searchTodo(searchVal) {
    if (!searchVal?.trim()) {
      setTodos(allTodos);
      return;
    }
    const searchTask = allTodos.filter((e) =>
      e.task.toLowerCase().includes(searchVal.toLowerCase())
    );
    setTodos(searchTask);
  }
  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("tickTask"));
    if (saved && Array.isArray(saved)) {
      setTodos(saved);
      setAllTodos(saved);
    }
  }, []);
  useEffect(() => {
    localStorage.setItem("tickTask", JSON.stringify(todos));
    const obj = {
      task: "sadad",
      status: "pending",
      description: "sadasdas",
      priority: "Medium",
      date: "2025-08-08",
      isComplete: false,
    };
    let arr = [];
  }, [todos]);

  return (
    <>
      <div>
        {/* <div className="flex items-center justify-center p-2 sm:p-3 md:p-6" > */}
        <div className="flex items-center justify-center p-2 sm:p-3 md:p-6">
          <div className="relative group w-full max-w-6xl">
            <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-purple-500 to-indigo-500 opacity-20 blur-2xl group-hover:opacity-40 transition duration-700"></div>

            <div className="relative z-10 w-full bg-black/90 rounded-2xl p-3 sm:p-8 md:p-8 shadow-[0_20px_60px_rgba(0,0,0,0.9)] border border-gray-800 backdrop-blur-md">
              <div className="flex justify-end mb-4">
                {/* <button
                  onClick={toggleDarkMode}
                  className="inline-flex items-center gap-2 bg-[#111] text-white px-4 py-2 rounded-lg text-sm font-medium border border-gray-700 hover:bg-[#1f1f1f] transition duration-300">
                  {!isDarkMode ? <MdLightMode /> : <MdOutlineLightMode />}
                </button> */}
              </div>

              <div className="text-center mb-4">
                <h1 className="text-4xl sm:text-5xl font-extrabold text-white tracking-tight animate-slideIn">
                  Tic Task
                </h1>

                <p
                  className="text-gray-400 mt-3 text-base sm:text-lg animate-slideIn"
                  style={{ animationDelay: "0.2s" }}>
                  Track your tasks with elegance and efficiency
                </p>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-10 animate-fadeIn">
                <SummaryCard
                  title="Total Tasks"
                  count={todos.length}
                  iconColor="text-gray-400"
                  iconPath="M9 17v-6h13M9 13h13"
                />
                <SummaryCard
                  title="Completed"
                  count={todos.filter((e) => e.isComplete === true).length}
                  iconColor="text-green-500"
                  iconPath="M5 13l4 4L19 7"
                />
                <SummaryCard
                  title="Pending"
                  count={todos.filter((e) => e.isComplete !== true).length}
                  iconColor="text-yellow-500"
                  iconPath="M8 7V3M16 7V3M3 11h18M5 19h14a2 2 0 002-2v-5H3v5a2 2 0 002 2z"
                />
              </div>
              <form onSubmit={submitTodo}>
                <div
                  className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-10 animate-slideIn"
                  style={{ animationDelay: "0.7s" }}>
                  <input
                    onChange={(e) => setTask(e.target.value)}
                    value={task}
                    type="text"
                    placeholder="Task title"
                    className="w-full bg-[#0d0d0d] text-white rounded-lg p-2.5 text-base border border-gray-700 focus:outline-none focus:ring-2 focus:ring-purple-600 transition duration-300"
                  />
                  <input
                    onChange={(e) => setDescription(e.target.value)}
                    value={description}
                    type="text"
                    placeholder="Task description"
                    className="w-full bg-[#0d0d0d] text-white rounded-lg p-2.5 text-base border border-gray-700 focus:outline-none focus:ring-2 focus:ring-purple-600 transition duration-300"
                  />
                  <select
                    value={priority}
                    onChange={(e) => setPriority(e.target.value)}
                    className="w-full bg-[#0d0d0d] text-white rounded-lg p-2.5 text-base border border-gray-700 focus:outline-none focus:ring-2 focus:ring-purple-600 transition duration-300">
                    <option value="">Select priority</option>
                    <option value="Low">Low</option>
                    <option value="Medium">Medium</option>
                    <option value="High">High</option>
                  </select>
                  <input
                    onChange={(e) => setDate(e.target.value)}
                    value={date}
                    type="date"
                    className="w-full bg-[#0d0d0d] text-white rounded-lg p-2.5 text-base border border-gray-700 focus:outline-none focus:ring-2 focus:ring-purple-600 transition duration-300"
                  />
                  <div className="sm:col-span-3">
                    {isEdit ? (
                      <div className="flex flex-col sm:flex-row gap-4">
                        <button
                          type="submit"
                          className="w-full sm:w-1/2 bg-[#111] hover:bg-[#1f1f1f] text-white font-medium py-3 px-6 rounded-lg transition duration-300 shadow-[0_0_10px_rgba(255,255,255,0.05)] hover:shadow-[0_0_15px_rgba(255,255,255,0.1)]">
                          Update Task
                        </button>
                        <button
                          type="button"
                          onClick={() => {
                            setIsEdit(false);
                            setTask("");
                            setDescription("");
                            setPriority("");
                            setDate("");
                            setEditIndex("");
                            setStatus("pending");
                            setIsComplete(false);
                          }}
                          className="w-full sm:w-1/2 bg-gray-800 hover:bg-gray-700 text-white font-medium py-3 px-6 rounded-lg transition duration-300 border border-gray-700">
                          Cancel Edit
                        </button>
                      </div>
                    ) : (
                      <button
                        type="submit"
                        disabled={
                          task === "" ||
                          priority === "" ||
                          description === "" ||
                          date === ""
                        }
                        className="w-full bg-[#111] hover:bg-[#1f1f1f] text-white font-medium py-3 px-6 rounded-lg transition duration-300 shadow-[0_0_10px_rgba(255,255,255,0.05)] hover:shadow-[0_0_15px_rgba(255,255,255,0.1)] disabled:grayscale disabled:contrast-75 disabled:cursor-not-allowed">
                        Add Task
                      </button>
                    )}
                  </div>
                </div>
              </form>
              <div className="flex flex-col gap-4 sm:gap-6 mb-8 animate-fadeIn">
                <h2 className="text-white text-xl font-semibold">
                  Search & Sort Tasks
                </h2>

                <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
                  <input
                    onKeyUp={(e) => searchTodo(e.target.value)}
                    type="text"
                    placeholder="Search tasks..."
                    className="w-full sm:w-1/2 bg-[#0d0d0d] text-white rounded-lg p-3 text-base border border-gray-700 focus:outline-none focus:ring-2 focus:ring-purple-600 transition duration-300"
                  />
                  <select
                    onChange={(e) => sortTask(e.target.value)}
                    className="w-full sm:w-1/3 bg-[#0d0d0d] text-white rounded-lg p-3 text-base border border-gray-700 focus:outline-none focus:ring-2 focus:ring-purple-600 transition duration-300">
                    <option value="">Sort by</option>
                    <option value="all">Status (All)</option>
                    <option value="completed">Status (Completed)</option>
                    <option value="pending">Status (Pending)</option>
                  </select>
                </div>
              </div>
              <div className="overflow-x-auto max-h-48 rounded-xl border border-gray-800">
                <table className="w-full text-left bg-[#0d0d0d]">
                  <thead className="sticky top-0 z-10 bg-black">
                    <tr className="text-gray-400 text-sm">
                      <th className="p-3 font-semibold">Task</th>
                      <th className="p-3 font-semibold">Description</th>
                      <th className="p-3 font-semibold">Priority</th>
                      <th className="p-3 font-semibold">Due Date</th>
                      <th className="p-3 font-semibold  ">status</th>
                      <th className="p-3 font-semibold">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {todos.length > 0 ? (
                      todos.map((task, index) => (
                        <Table
                          deleteTodo={deleteTodo}
                          editTodo={editTodo}
                          taskBookMark={taskBookMark}
                          key={index}
                          task={task}
                          index={index}
                        />
                      ))
                    ) : (
                      <tr>
                        <td colSpan="6">
                          <EmptyPage />
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
        <Modal
          show={show}
          handleDeleteTask={handleDeleteTask}
          deleteIndex={deleteIndex}
          handleClose={handleClose}
        />
      </div>
    </>
  );
}
export default Notes;
