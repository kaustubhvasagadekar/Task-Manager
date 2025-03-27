import { BrowserRouter } from 'react-router-dom';
import { AppBar, Toolbar, Button, Typography } from "@mui/material";
import { AuthProvider } from './context/AuthContext';
import { TaskProvider } from './context/TaskContext';
import AppRoutes from './AppRoutes';

function App() {
  return (
    <AuthProvider>
      <TaskProvider>
        <BrowserRouter>
          <AppRoutes />
        </BrowserRouter>
      </TaskProvider>
    </AuthProvider>
  );
}

export default App;
