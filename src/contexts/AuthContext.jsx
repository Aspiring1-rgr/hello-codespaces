import React from 'react'
import { createContext, useState, useContext, useEffect } from 'react'
import PropTypes from 'prop-types'
import { jwtDecode } from 'jwt-decode'

export const AuthContext = createContext({
  token: null,
  setToken: () => {},
})

function isValidToken(token) {
  if (!token) return false

  try {
    const decoded = jwtDecode(token)

    return Boolean(decoded.sub) && decoded.exp > Date.now() / 1000
  } catch {
    return false
  }
}

export const AuthContextProvider = ({ children }) => {
  const [token, setTokenState] = useState(null)

  useEffect(() => {
    const storedToken = localStorage.getItem('token')

    if (isValidToken(storedToken)) {
      setTokenState(storedToken)
    } else {
      localStorage.removeItem('token')
      setTokenState(null)
    }
  }, [])

  const setToken = (newToken) => {
    if (isValidToken(newToken)) {
      localStorage.setItem('token', newToken)
      setTokenState(newToken)
    } else {
      localStorage.removeItem('token')
      setTokenState(null)
    }
  }

  return (
    <AuthContext.Provider value={{ token, setToken }}>
      {children}
    </AuthContext.Provider>
  )
}

AuthContextProvider.propTypes = {
  children: PropTypes.node.isRequired,
}

export function useAuth() {
  const { token, setToken } = useContext(AuthContext)

  return [token, setToken]
}
