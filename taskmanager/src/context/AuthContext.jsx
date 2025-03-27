import React, { createContext, useState, useContext, useReducer, useEffect } from 'react'

const AuthContext = createContext(null)

const initialState= {
  isAuthenticated: false,
  user: null,
  loading: true,
  error: null
};


const authReducer = (state, action) => {
  switch (action.type) {
    case 'LOGIN_SUCCESS':
      return {
        ...state,
        isAuthenticated: true,
        user: action.payload,
        loading: false,
        error: null
      };
    case 'LOGOUT':
      return {
        ...state,
        isAuthenticated: false,
        user: null,
        loading: false
      };
    case 'AUTH_ERROR':
      return {
        ...state,
        isAuthenticated: false,
        loading: false,
        error: action.payload
      };
    case 'CLEAR_ERROR':
      return {
        ...state,
        error: null
      };
    case 'LOADING':
      return {
        ...state,
        loading: true
      };
    default:
      return state;
  }
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [response, setResponse] = useState(null)
  const [state, dispatch] = useReducer(authReducer, initialState);

  useEffect(() => {
    const checkLoggedIn = async () => {
      try {
        const storedUser = localStorage.getItem('user');

        if (storedUser) {
          const user = JSON.parse(storedUser);
          setUser(user);
          dispatch({ type: 'LOGIN_SUCCESS', payload: user });
        } else {
          dispatch({ type: 'LOGOUT' });
        }
      } catch (error) {
        dispatch({ type: 'LOGOUT' });
      }
    };

    checkLoggedIn();
  }, []);
 
  const login = async (email, password) => {
    setResponse(null)
    const loginResponse = await fetch('http://localhost:5000/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
    });
    const data = await loginResponse.json();
    
    setResponse(data);
    if (loginResponse.ok) {
      setUser(user);
        localStorage.setItem('user', JSON.stringify(data.user));
        dispatch({ type: 'LOGIN_SUCCESS', payload: data.user });
        setResponse(null);
        return true;
  
    }
    return false;
  }

  const register = async (username, email, password) => {
    setResponse(null)
    await new Promise(resolve => setTimeout(resolve, 1000));
    const registerResponse = await fetch('http://localhost:5000/api/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, email, password })
    });
    const data = await registerResponse.json();
    setResponse(data);
    if (registerResponse.ok) {
        setUser(data.user);
        localStorage.setItem('user', JSON.stringify(data.user));
        dispatch({ type: 'LOGIN_SUCCESS', payload: data.user });
        return true;
    }
    return false;
  }

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
    dispatch({ type: 'LOGOUT' });
  }

 const clearResponce = () => {
    setResponse(null)
  }

  return (
    <AuthContext.Provider value={{ user, response, login, register, logout,clearResponce  }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (context === null) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}