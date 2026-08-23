import http from 'node:http'
import { sendResponse } from './utils/sendResponse.js'
import { serveStatic } from './utils/serveStatic.js'
import { handlePrice } from './handlers/routeHandlers.js'

const PORT = 8000

const __dirname = import.meta.dirname

const server = http.createServer(async (req, res) => {
    if(req.url.startsWith('/api')) {
        if(req.url === '/api/live_prices') {
            return await handlePrice(req, res)
        }
    }
    if (!req.url.startsWith('/api')) {
        return await serveStatic(req, res, __dirname)
    }
})

server.listen(PORT, () => console.log(`Server is running on port: ${PORT}`))