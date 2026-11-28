import React from 'react'
import { Link } from 'react-router-dom'
import { User } from './User.jsx'
import { jwtDecode } from 'jwt-decode'
import { useAuth } from '../contexts/AuthContext.jsx'
import { useQuery } from '@tanstack/react-query'
import { useApolloClient } from '@apollo/client/react/index.js'
import { getUserInfo } from '../api/users.js'

export function Header() {
  const [token, setToken] = useAuth()
  const apolloClient = useApolloClient()

  const { sub } = token ? jwtDecode(token) : {}

  const userInfoQuery = useQuery({
    queryKey: ['users', sub],
    queryFn: () => getUserInfo(sub),
    enabled: Boolean(sub),
  })

  const userInfo = userInfoQuery.data

  async function handleLogout() {
    setToken(null)
    await apolloClient.clearStore()
  }

  if (token) {
    return (
      <div>
        Logged in as {userInfo ? <User {...userInfo} /> : 'Loading user...'}
        <br />
        <button onClick={handleLogout}>Logout</button>
      </div>
    )
  }

  return (
    <div>
      <Link to='/login'>Log In</Link>
      {' | '}
      <Link to='/signup'>Sign Up</Link>
    </div>
  )
}
