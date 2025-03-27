import { Routes, Route, Navigate } from 'react-router-dom'
import { AppBar, Toolbar, Button, Typography } from '@mui/material'
import { useAuth } from './context/AuthContext'
import TaskList from './components/TaskList'
import LoginPage from './pages/LoginPage'
import RegisterPage from './pages/RegisterPage'
import HomePage from './pages/HomePage'

const PrivateRoute = ({ children }) => {
	const { user, logout } = useAuth()
	const storedUser = JSON.parse(localStorage.getItem('user'))

	if (!user && !storedUser) {
		return <Navigate to="/login" />
	}

	return (
		<>
			<AppBar position="static">
				<Toolbar>
					<Typography variant="h6" sx={{ flexGrow: 1 }}>
						Task Manager
					</Typography>
					<Typography variant="h6" sx={{ flexGrow: 1 }}>
						welcome {user?.name || storedUser?.name}
					</Typography>
					<Button color="inherit" onClick={logout}>
						Logout
					</Button>
				</Toolbar>
			</AppBar>
			{children}
		</>
	)
}


const PublicRoute = ({ children }) => {
	const { user } = useAuth()
	const storedUser = JSON.parse(localStorage.getItem('user'))
	if (user || storedUser) {
		return <Navigate to="/tasks" />
	}
	return children
}

function AppRoutes() {
	return (
		<Routes>
			<Route path="/" element={
				<PublicRoute>
					<HomePage />
				</PublicRoute>
			} />
			<Route path="/login" element={
				<PublicRoute>
					<LoginPage />
				</PublicRoute>
			} />
			<Route path="/register" element={
				<PublicRoute>
					<RegisterPage />
				</PublicRoute>
			} />
			<Route
				path="/tasks"
				element={
					<PrivateRoute>
						<TaskList />
					</PrivateRoute>
				}
			/>
			<Route path="*" element={<Navigate to="/" />} />
		</Routes>
	)
}

export default AppRoutes