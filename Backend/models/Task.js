import mongoose from "mongoose";

const taskSchema = new mongoose.Schema({
  title: { type: String, required: true },
  desc: { type: String, default: "" }, 
  status: { type: String, enum: ["TODO", "IN_PROGRESS", "DONE"], default: "TODO" },
  createdAt: { type: Date, default: Date.now },
});

const Task = mongoose.model("Task", taskSchema);
export default Task;
