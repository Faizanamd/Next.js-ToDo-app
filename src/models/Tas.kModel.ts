import mongoose from "mongoose";

const taskSchema = new mongoose.Schema({
    userId:String,
    title:String,
    description:String,
})

const TaskModel = mongoose.models.tasks || mongoose.model("tasks", taskSchema);
export default TaskModel;