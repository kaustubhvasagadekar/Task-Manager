import React from 'react'
import { Container, Typography, Box, Button } from '@mui/material'
import { Link as RouterLink } from 'react-router-dom'

const HomePage = () => {
  return (
    <Container maxWidth="md">
      <Box sx={{ mt: 8, mb: 8, textAlign: 'center' }}>
        <Typography variant="h3" component="h1" gutterBottom>
          Welcome to Task Manager
        </Typography>
        <Typography variant="h5" color="text.secondary" paragraph>
        To manage your tasks. Please login or register to get started.
        </Typography>

        <Box sx={{ mt: 4 }}>
          <Button
            variant="contained"
            size="large"
            component={RouterLink}
            to="/register"
            sx={{ minWidth: 200, mr: 2 }}
          >
            Get Started
          </Button>
          <Button
            variant="outlined"
            size="large"
            component={RouterLink}
            to="/login"
            sx={{ minWidth: 200 }}
          >
            Sign In
          </Button>
        </Box>
      </Box>

   
    </Container>
  )
}

export default HomePage
