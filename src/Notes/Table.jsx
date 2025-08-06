import React from "react";
import { FaRegEdit } from "react-icons/fa";
import { RiDeleteBin2Fill } from "react-icons/ri";
import { FaRegBookmark } from "react-icons/fa";
import { FaBookmark } from "react-icons/fa";
import { MdModeEditOutline } from "react-icons/md";
function Table({ task, index, deleteTodo, editTodo, taskBookMark }) {
  console.log(task);
  return (
    <>
      <tr
        key={index}
        className="border-b border-gray-800 bg-[#0d0d0d]/80 hover:bg-[#1a1a1a] transition duration-300">
        <td className="p-3 text-white">{task.task}</td>
        <td className="p-3 text-white">{task.description}</td>
        <td className="p-3 text-white">{task.priority}</td>
        <td className="p-3 text-white">{task.date}</td>
        <td className="p-3">
          <span
            className={`${
              task.status === "Completed"
                ? "bg-green-600/20 text-green-300"
                : "bg-yellow-600/20 text-yellow-300"
            } px-3 py-1 rounded-full text-sm font-medium`}>
            {task.status}
          </span>
        </td>
        <td className="p-3 space-x-2">
          <button
            onClick={() => editTodo(task, index)}
            className="text-gray-300 hover:text-white  text-sm">
            <MdModeEditOutline title="edit" />
          </button>
          <button
            onClick={() => deleteTodo(index)}
            className="text-red-400 hover:text-red-300 text-sm">
            <RiDeleteBin2Fill title="delete" />
          </button>
          <button
            onClick={() => taskBookMark(task, index)}
            className="text-red-400 hover:text-red-300 text-sm">
            <FaBookmark title="mark complete" />
          </button>
        </td>
      </tr>
    </>
  );
}

export default Table;
