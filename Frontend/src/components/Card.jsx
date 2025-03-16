import React, { useState } from "react";
import Modal from "../Model/Model"; // Import Modal Component

const TaskCard = ({ task, onEdit, onDelete }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalType, setModalType] = useState("");

  const openModal = (type) => {
    setModalType(type);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="bg-blue-100 p-4 rounded-lg shadow-md mb-2 min-h-[160px] flex flex-col justify-between">
      <div>
        <h4 className="font-medium">{task.title}</h4>
        <p className="text-sm text-gray-700 mt-1">{task.desc}</p>
        <p className="text-xs text-gray-500 mt-2">Created at: {task.createdAt}</p>
      </div>
      <div className="flex justify-end gap-2 mt-4">
        <button onClick={() => openModal("delete")} className="bg-red-500 text-white px-2 py-1 text-xs rounded cursor-pointer">Delete</button>
        <button onClick={() => openModal("edit")} className="bg-blue-500 text-white px-2 py-1 text-xs rounded cursor-pointer">Edit</button>
        <button onClick={() => openModal("view")} className="bg-gray-500 text-white px-2 py-1 text-xs rounded cursor-pointer">View Detail</button>
      </div>

      {/* Modal Component */}
      {isModalOpen && (
        <Modal
          isOpen={isModalOpen}
          onClose={closeModal}
          type={modalType}
          task={task}
          onSave={onEdit}
          onDelete={onDelete}
        />
      )}
    </div>
  );
};

export default TaskCard;
