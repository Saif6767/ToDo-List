import React, { useState, useEffect } from "react";

const Modal = ({ isOpen, onClose, type, task, onSave, onDelete }) => {
  const [formData, setFormData] = useState({ title: "", desc: "", status: "TODO" });
  
  useEffect(() => {
    if (task) {
      setFormData(task);
    } else {
      setFormData({ title: "", desc: "", status: "TODO" });
    }
  }, [task, isOpen]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    if (!formData.title.trim()) {
      alert("Task title cannot be empty!");
      return;
    }
    onSave(formData);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 px-4 z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-lg relative">
        
        {/* Close Button */}
        <button 
          onClick={onClose} 
          className="absolute top-3 right-3 text-gray-600 hover:text-gray-800 cursor-pointer text-lg"
        >
          ✕
        </button>

        {/* Modal Title */}
        <h3 className="text-2xl font-semibold text-center text-blue-600 mb-4">
          {type === "add" && "Add New Task"}
          {type === "edit" && "Edit Task"}
          {type === "view" && "Task Details"}
          {type === "delete" && "Confirm Delete"}
        </h3>

        {/* Delete Confirmation */}
        {type === "delete" ? (
          <p className="text-red-600 text-center text-lg">Are you sure you want to delete this task?</p>
        ) : type === "view" ? (
          <div className="text-gray-800 text-lg space-y-3">
            <p><strong>Title:</strong> {task?.title}</p>
            <p><strong>Description:</strong> {task?.desc}</p>
            <p><strong>Status:</strong> {task?.status}</p>
          </div>
        ) : (
          <div className="mt-4">
            {/* Title */}
            <label className="block text-sm font-medium">Title</label>
            <input
              type="text"
              name="title"
              className="border w-full px-3 py-2 rounded mb-3 focus:outline-none focus:ring-2 focus:ring-blue-400"
              value={formData.title}
              onChange={handleChange}
            />

            {/* Description */}
            <label className="block text-sm font-medium">Description</label>
            <textarea
              name="desc"
              className="border w-full px-3 py-2 rounded mb-3 focus:outline-none focus:ring-2 focus:ring-blue-400"
              value={formData.desc}
              rows="4"
              onChange={handleChange}
            />

            {/* Status */}
            <label className="block text-sm font-medium">Status</label>
            <select
              name="status"
              className="border w-full px-3 py-2 rounded mb-3"
              value={formData.status}
              onChange={handleChange}
            >
              <option value="TODO">TODO</option>
              <option value="IN_PROGRESS">IN PROGRESS</option>
              <option value="DONE">DONE</option>
            </select>
          </div>
        )}

        {/* Buttons */}
        <div className="flex justify-end gap-3 mt-6">
          <button 
            onClick={onClose} 
            className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400 cursor-pointer"
          >
            Close
          </button>

          {type === "add" && (
            <button 
              onClick={handleSubmit} 
              className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 cursor-pointer"
            >
              Add Task
            </button>
          )}

          {type === "edit" && (
            <button 
              onClick={handleSubmit} 
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 cursor-pointer"
            >
              Save Changes
            </button>
          )}

          {type === "delete" && (
            <button 
              onClick={() => { onDelete(); onClose(); }} 
              className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 cursor-pointer"
            >
              Delete
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Modal;
