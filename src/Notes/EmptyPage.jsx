import React from "react";
import { FaRegStickyNote } from "react-icons/fa";
function EmptyPage() {
  return (
    <div className="flex flex-col items-center justify-center h-full text-center py-16">
      <FaRegStickyNote size={60} className="text-gray-400 mb-4" />
      <h2 className="text-2xl font-bold text-gray-600">No Notes Yet</h2>
      <p className="text-gray-500 mt-2">
        You haven’t added any notes. Start by creating one!
      </p>
    </div>
  );
}

export default EmptyPage;
