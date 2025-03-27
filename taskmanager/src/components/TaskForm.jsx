import React, { useState, useEffect } from 'react';
import {
  Box,
  TextField,
  Button,
  Paper,
  Typography,
  CircularProgress,
  Alert,
  Collapse,
  IconButton,
} from '@mui/material';
import {
  Add as AddIcon,
  Close as CloseIcon,
  ExpandMore as ExpandMoreIcon,
} from '@mui/icons-material';

const TaskForm = ({ task, onSubmit }) => {
  const [title, setTitle] = useState(task ? task.title : '');
  const [description, setDescription] = useState(task ? task.description : '');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [formOpen, setFormOpen] = useState(false);
  const [formErrors, setFormErrors] = useState({});

  useEffect(() => {
    if (task) {
      setTitle(task.title);
      setDescription(task.description);
    }
  }, [task]);

  const validateForm = () => {
    const errors = {};
    if (!title.trim()) {
      errors.title = 'Title is required.';
    }
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setLoading(true);
    try {
      await onSubmit({ title, description });
      setTitle('');
      setDescription('');
      setFormErrors({});
      setError(null);
      setFormOpen(false);
    } catch (err) {
      setError('Failed to save the task. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const toggleForm = () => {
    setFormOpen(!formOpen);
    if (!formOpen) {
      setTitle('');
      setDescription('');
      setFormErrors({});
      setError(null);
    }
  };

  return (
    <Paper sx={{ mt: 2, mb: 3, mx: 5, overflow: 'hidden' }}>
      <Box
        sx={{
          p: 2,
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          backgroundColor: 'primary.main',
          color: 'white',
        }}
        onClick={toggleForm}
      >
        <Typography variant="h6">
          {formOpen ? 'Cancel' : 'Add New Task'}
        </Typography>
        <IconButton
          color="inherit"
          onClick={(e) => {
            e.stopPropagation();
            toggleForm();
          }}
        >
          {formOpen ? <CloseIcon /> : <ExpandMoreIcon />}
        </IconButton>
      </Box>

      <Collapse in={formOpen}>
        <Box component="form" onSubmit={handleSubmit} sx={{ p: 2 }}>
          {error && (
            <Alert
              severity="error"
              sx={{ mb: 2 }}
              action={
                <IconButton
                  aria-label="close"
                  color="inherit"
                  size="small"
                  onClick={() => setError(null)}
                >
                  <CloseIcon fontSize="inherit" />
                </IconButton>
              }
            >
              {error}
            </Alert>
          )}

          <TextField
            margin="normal"
            required
            fullWidth
            id="title"
            label="Task Title"
            name="title"
            autoFocus
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            error={!!formErrors.title}
            helperText={formErrors.title}
            disabled={loading}
          />

          <TextField
            margin="normal"
            fullWidth
            id="description"
            label="Description (optional)"
            name="description"
            multiline
            rows={3}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            disabled={loading}
          />

          <Button
            type="submit"
            variant="contained"
            sx={{ mt: 2 }}
            startIcon={
              loading ? <CircularProgress size={20} color="inherit" /> : <AddIcon />
            }
            disabled={loading}
          >
            {loading ? 'Saving...' : 'Save Task'}
          </Button>
        </Box>
      </Collapse>
    </Paper>
  );
};

export default TaskForm;