import { createServer } from 'node:http'
import { readFileSync } from 'node:fs'

const server = createServer((req, res) => {
  res.writeHead(200, { 'Content-Type': 'application/json' })
  res.end(readFileSync('backend/users.json'))
})
const host = 'localhost'
const port = 3000
server.listen(port, host, () => {
  console.log(`Server is running at http://${host}:${port}`)
})
