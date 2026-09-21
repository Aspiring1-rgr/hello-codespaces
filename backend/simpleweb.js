import { createServer } from 'node:http'

const server = createServer((req, res) => {
  res.writeHead(200, { 'Content-Type': 'text/plain' })
  res.end('Hello, World!')
})

const host = 'localhost'
const port = 3000
server.listen(port, host, () => {
  console.log(`Server is running at http://${host}:${port}`)
})
