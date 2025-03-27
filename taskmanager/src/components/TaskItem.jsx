import React from 'react';
import {
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  IconButton,
  Checkbox,
} from '@mui/material';
import { Delete as DeleteIcon, Edit as EditIcon } from '@mui/icons-material';

const TaskItem = ({ task, onEdit, onDelete, onToggleComplete }) => {
    
  return (
    <ListItem>
      <Checkbox
        edge="start"
        checked={task.completed || false}
        onChange={() => onToggleComplete(task._id)}
        inputProps={{ 'aria-label': 'Mark task as completed' }}
      />
      <ListItemText
        primary={task.title}
        secondary={task.description || 'No description'}
        sx={{
          textDecoration: task.completed ? 'line-through' : 'none',
          color: task.completed ? 'gray' : 'inherit',
        }}
      />
      <ListItemSecondaryAction>
        <IconButton edge="end" aria-label="edit" onClick={() => onEdit(task)}>
          <EditIcon />
        </IconButton>
        <IconButton edge="end" aria-label="delete" onClick={() => onDelete(task._id)}>
          <DeleteIcon />
        </IconButton>
      </ListItemSecondaryAction>
    </ListItem>
  );
};

export default TaskItem;
