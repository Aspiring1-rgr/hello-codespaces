import React from 'react'
import { Blog } from './pages/Blog.jsx'
import { Signup } from './pages/Signup.jsx'
import { Login } from './pages/Login.jsx'
import { ViewPost } from './pages/ViewPost.jsx'
import { useParams } from 'react-router-dom'

function RecipeRoute() {
  const { postId } = useParams()

  return <ViewPost postId={postId} />
}

export const routes = [
  {
    path: '/',
    element: <Blog />,
  },
  {
    path: '/signup',
    element: <Signup />,
  },
  {
    path: '/login',
    element: <Login />,
  },
  {
    path: '/posts/:postId/:slug?',
    element: <RecipeRoute />,
  },
]
