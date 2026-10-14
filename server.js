import 'dotenv/config'
import http from 'node:http'
import { serveStatic } from './utils/serveStatic.js'
import { handlePost, handlePrice } from './handlers/routeHandlers.js'
import { sendResponse } from './utils/sendResponse.js'

const PORT = 8000

const __dirname = import.meta.dirname

const server = http.createServer(async (req, res) => {
    if (req.url.startsWith('/api')) {
        if (req.url === '/api/live_prices') {
            return await handlePrice(res)
        }
        else if (req.url === '/api/buy' && req.method === 'POST') {
            handlePost(req, res)
        }
        else {
            sendResponse(res, 404, 'application/json', JSON.stringify({ error: 'Not Found' }))
        }
    }
    if (!req.url.startsWith('/api')) {
        return await serveStatic(req, res, __dirname)
    }
})

server.listen(PORT, () => console.log(`Server is running on port: ${PORT}`))