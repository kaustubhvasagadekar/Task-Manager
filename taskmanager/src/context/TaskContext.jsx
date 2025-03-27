import React, { createContext, useContext, useState, useEffect } from 'react';
import { createTask as apiCreateTask, updateTask as apiUpdateTask, deleteTask as apiDeleteTask, fetchTasks as apiFetchTasks } from '../utils/api';

const TaskContext = createContext();

export const TaskProvider = ({ children }) => {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    const loadTasks = async () => {
      try {
        const fetchedTasks = await apiFetchTasks();
        setTasks(fetchedTasks);
      } catch (error) {
        console.error('Failed to fetch tasks:', error);
      }
    };
    loadTasks();
  }, []);

  const createTask = async (task, userId) => {
    try {
      const newTask = await apiCreateTask(task, userId); 
      setTasks((prevTasks) => [...prevTasks, newTask]);
    } catch (error) {
      console.error('Failed to create task:', error);
    }
  };

  const updateTask = async (taskId, updatedTask) => {
    try {
      const updated = await apiUpdateTask(taskId, updatedTask);
      setTasks((prevTasks) =>
        prevTasks.map((task) => (task._id === taskId ? updated : task))
      );
    } catch (error) {
      console.error('Failed to update task:', error);
    }
  };

  const deleteTask = async (taskId) => {
    try {
      await apiDeleteTask(taskId);
      setTasks((prevTasks) => prevTasks.filter((task) => task._id !== taskId));
    } catch (error) {
      console.error('Failed to delete task:', error);
    }
  };

  const clearTasks = () => {
    setTasks([]);
  };

  return (
    <TaskContext.Provider value={{ tasks, createTask, updateTask, deleteTask, clearTasks }}>
      {children}
    </TaskContext.Provider>
  );
};

export const useTaskContext = () => {
  const context = useContext(TaskContext);
  if (!context) {
    throw new Error('useTaskContext must be used within a TaskProvider');
  }
  return context;
};
