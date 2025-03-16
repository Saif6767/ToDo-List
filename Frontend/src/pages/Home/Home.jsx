import React, { useState, useEffect } from "react";
import Navbar from "../Home/Nav";
import TaskBoard from "../../components/TaskBoard"; 
import Modal from "../../Model/Model"; 

const Home = () => {
  const [tasks, setTasks] = useState([]);
  const [search, setSearch] = useState("");
  const [sortBy, setSortBy] = useState("Recent");
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalType, setModalType] = useState("add");
  const [currentTask, setCurrentTask] = useState(null);

  // Backend stasks fetch 
  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await fetch("http://localhost:4001/api/tasks");
        const data = await response.json();
        setTasks(data);
      } catch (error) {
        console.error("Error fetching tasks:", error);
      }
    };

    fetchTasks();
  }, []);

  // Task add function
  const handleAddTask = async (taskData) => {
    try {
      const response = await fetch("http://localhost:4001/api/tasks", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(taskData),
      });

      if (!response.ok) throw new Error("Failed to add task");

      const addedTask = await response.json();
      setTasks((prevTasks) => [...prevTasks, addedTask]);
      setIsModalOpen(false);
    } catch (error) {
      console.error("Error adding task:", error);
    }
  };

  //  Task update 
  const handleEditTask = async (updatedTask) => {
    try {
      const response = await fetch(`http://localhost:4001/api/tasks/${updatedTask._id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedTask),
      });

      if (!response.ok) throw new Error("Failed to update task");

      setTasks((prevTasks) =>
        prevTasks.map((task) => (task._id === updatedTask._id ? updatedTask : task))
      );
      setIsModalOpen(false);
    } catch (error) {
      console.error("Error updating task:", error);
    }
  };

  //  Task delete 
  const handleDeleteTask = async (taskId) => {
    try {
      const response = await fetch(`http://localhost:4001/api/tasks/${taskId}`, {
        method: "DELETE",
      });

      if (!response.ok) throw new Error("Failed to delete task");

      setTasks((prevTasks) => prevTasks.filter((task) => task._id !== taskId));
    } catch (error) {
      console.error("Error deleting task:", error);
    }
  };

  //  Sorting + Filtering logic
  const filteredTasks = [...tasks]
    .filter((task) => task.title.toLowerCase().includes(search.toLowerCase()))
    .sort((a, b) => {
      const dateA = new Date(a.createdAt).getTime();
      const dateB = new Date(b.createdAt).getTime();
      return sortBy === "Recent" ? dateB - dateA : dateA - dateB;
    });
    const handleLogout = () => {
      setIsLoggedIn(false);
      //  token remove 
    };

  return (
    <>
     <Navbar isLoggedIn={isLoggedIn} handleLogout={handleLogout} />
      <div className="p-6">
        {/*  Add Task Button */}
        <button
          className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 cursor-pointer"
          onClick={() => {
            setModalType("add");
            setCurrentTask({ title: "", desc: "", status: "TODO" });
            setIsModalOpen(true);
          }}
        >
          Add Task
        </button>

        {/*  Search & Sorting */}
        <div className="flex justify-between mt-3">
          <input
            type="text"
            placeholder="Search..."
            className="border rounded-md px-3 py-1 w-1/3"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <select
            className="border rounded-md px-3 py-1"
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
          >
            <option value="Recent">Sort by: Recent</option>
            <option value="Oldest">Sort by: Oldest</option>
          </select>
        </div>

        {/*  Drag-and-Drop TaskBoard */}
        <TaskBoard tasks={filteredTasks} setTasks={setTasks} handleEditTask={handleEditTask} handleDeleteTask={handleDeleteTask} />
      </div>

      {/*  Modal */}
      {isModalOpen && (
        <Modal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          type={modalType}
          task={currentTask}
          onSave={modalType === "add" ? handleAddTask : handleEditTask}
          onDelete={() => handleDeleteTask(currentTask._id)}
        />
      )}
    </>
  );
};

export default Home;
