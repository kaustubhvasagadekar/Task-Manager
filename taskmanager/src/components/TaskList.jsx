import React, { useState, useEffect } from "react";
import {
  Box,
  List,
  Typography,
  Alert,
  Modal,
  Button,
  Card,
  TextField
} from "@mui/material";
import { useTaskContext } from "../context/TaskContext";
import TaskForm from "./TaskForm";
import TaskItem from "./TaskItem";
import SearchBox from "./SearchBox"; 

const TaskList = () => {
  const { tasks, createTask, updateTask, deleteTask } = useTaskContext();
  const [editingTask, setEditingTask] = useState(false);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [editTitle, setEditTitle] = useState("");
  const [editDescription, setEditDescription] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [filterType, setFilterType] = useState(null);

  useEffect(() => {
    if (editingTask) {
      setEditTitle(editingTask.title || "");
      setEditDescription(editingTask.description || "");
    }
  }, [editingTask]);

  const handleSave = (task) => {
    try {
      if (editingTask) {
        updateTask(editingTask.id, task);
      } else {
        createTask(task);
      }
      setEditingTask(false);
      setError(null);
    } catch (err) {
      setError("Failed to save the task.");
    }
  };

  const handleDelete = (taskId) => {
    try {
      deleteTask(taskId);
      setError(null);
    } catch (err) {
      setError("Failed to delete the task.");
    }
  };

  const handleToggleComplete = (taskId) => {
    try {
      const task = tasks.find((t) => t._id === taskId);
      if (task) {
        updateTask(taskId, { completed: !task.completed });
      }
    } catch (err) {
      setError("Failed to update task status.");
    }
  };

  const handleModalSave = () => {
    try {
      const updatedTask = {
        title: editTitle,
        description: editDescription,
      };
      updateTask(editingTask._id || editingTask.id, updatedTask);
      setEditingTask(false);
      setError(null);
    } catch (err) {
      setError("Failed to update task.");
    }
  };

  const filteredTasks = tasks.filter(task =>
    task.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (task.description &&
      task.description.toLowerCase().includes(searchTerm.toLowerCase()))
  );


  let finalTasks = filteredTasks;
  if (filterType === "completed") {
    finalTasks = filteredTasks.filter(task => task.completed === true);
  } else if (filterType === "not-completed") {
    finalTasks = filteredTasks.filter(task => task.completed === false);
  } else if (filterType === "all") {
  }

  console.log(finalTasks, filterType)

 

  return (
    <Box sx={{ mx: 5, mt: 2 }}>
      <Typography variant="h4" component="h1" gutterBottom textAlign={"center"}>
        Task List
      </Typography>
      {error && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
      )}
      <TaskForm task={editingTask} onSubmit={handleSave} />
      <SearchBox
        searchTerm={searchTerm}
        onSearchChange={(e) => setSearchTerm(e.target.value)}
        onFilterClick={(type) => setFilterType(type)}
      />
      <List>
      {finalTasks.map((task) => (
          <TaskItem
            key={task._id}
            task={task}
            onEdit={setEditingTask}
            onDelete={handleDelete}
            onToggleComplete={handleToggleComplete}
          />
        ))}
      </List>
      {editingTask && (
        <Modal open={!!editingTask} onClose={() => setEditingTask(null)}>
          <Box
            sx={{
              p: 2,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              minHeight: "100vh",
            }}
          >
            <Card sx={{ p: 2, width: 400 }}>
              <Typography variant="h6" gutterBottom>
                Edit Task
              </Typography>
              <TextField
                margin="normal"
                required
                fullWidth
                id="title"
                label="Task Title"
                value={editTitle}
                onChange={(e) => setEditTitle(e.target.value)}
                disabled={loading}
              />
              <TextField
                margin="normal"
                fullWidth
                id="description"
                label="Description (optional)"
                multiline
                rows={3}
                value={editDescription}
                onChange={(e) => setEditDescription(e.target.value)}
                disabled={loading}
              />
              <Button
                type="button"
                fullWidth
                variant="contained"
                color="primary"
                sx={{ mt: 2 }}
                onClick={handleModalSave}
              >
                Save
              </Button>
            </Card>
          </Box>
        </Modal>
      )}
    </Box>
  );
};

export default TaskList;
