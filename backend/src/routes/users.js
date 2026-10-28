import { createUser, loginUser, getUserInfoById } from '../services/users.js'
export function userRoutes(app) {
  app.get('/api/v1/users/:id', async (req, res) => {
    const userInfo = await getUserInfoById(req.params.id)
    return res.status(200).send(userInfo)
  })
  app.post('/api/v1/user/signup', async (req, res) => {
    try {
      const { username, password } = req.body
      const user = await createUser(username, password)
      return res.status(201).json({ username: user.username })
    } catch (error) {
      return res.status(400).json({
        error: 'Failed to create the user, does the username already exist?',
      })
    }
  })
  app.post('/api/v1/user/login', async (req, res) => {
    try {
      const { username, password } = req.body
      const token = await loginUser({ username, password })
      return res.status(200).json({ token })
    } catch (error) {
      return res.status(400).json({
        error: 'Login failed, did you enter the correct username and password?',
      })
    }
  })
}
