const API_BASE_URL = 'http://localhost:5000/api';

export const createTask = async (task) => {
  const user = JSON.parse(localStorage.getItem('user'));
  const userId = user?.id;
  const response = await fetch(`${API_BASE_URL}/tasks`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ ...task, userId }), 
  });
  if (!response.ok) {
    throw new Error('Failed to create task');
  }
  return response.json();
};

export const updateTask = async (taskId, task) => {
  const response = await fetch(`${API_BASE_URL}/tasks/${taskId}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(task),
  });
  if (!response.ok) {
    throw new Error('Failed to update task');
  }
  return response.json();
};

export const deleteTask = async (taskId) => {
  const response = await fetch(`${API_BASE_URL}/tasks/${taskId}`, {
    method: 'DELETE',
  });
  if (!response.ok) {
    throw new Error('Failed to delete task');
  }
  
  if (response.status === 204) {
    return {};
  }
  return response.json();
};

export const fetchTasks = async () => {
  const user = JSON.parse(localStorage.getItem('user'));
  const userId = user?.id;
  const response = await fetch(`${API_BASE_URL}/tasks/${userId}`);
  if (!response.ok) {
    throw new Error(`Failed to fetch tasks: ${response.statusText}`);
  }
  return response.json();
};
