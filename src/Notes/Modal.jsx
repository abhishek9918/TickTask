import React from "react";
import { motion, AnimatePresence } from "framer-motion";

function Modal({ show, handleDeleteTask, deleteIndex, handleClose }) {
  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed inset-0 z-[9999] bg-black/40 backdrop-blur-sm flex items-center justify-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.85, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.85, y: 30 }}
            transition={{ duration: 0.35, ease: "easeInOut" }}
            className="bg-[#111111] text-white w-full max-w-md mx-4 p-6 rounded-2xl shadow-2xl border border-gray-800">
            <h2 className="text-xl font-semibold mb-4">Delete Task?</h2>
            <p className="text-sm text-gray-400 mb-6">
              Are you sure you want to delete this task? This action cannot be
              undone.
            </p>
            <div className="flex justify-end gap-3">
              <button
                onClick={handleClose}
                className="px-4 py-2 rounded-lg bg-gray-700 hover:bg-gray-600 transition">
                Cancel
              </button>
              <button
                onClick={() => handleDeleteTask(deleteIndex)}
                className="px-4 py-2 rounded-lg bg-red-600 hover:bg-red-700 transition">
                Delete
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default Modal;
