import path from "node:path"
import fs from "node:fs/promises"
import { sendResponse } from "./sendResponse.js"
import { getContentType } from "./getContentType.js"

export async function serveStatic(req, res, baseDir) {

    const publicDir = path.join(baseDir, 'public')

    const filePath = path.join(
        publicDir,
        req.url === '/' ? 'index.html' : req.url)

    const ext = path.extname(filePath)

    const contentType = getContentType(ext)

    try {
        const payload = await fs.readFile(filePath)
        sendResponse(res, 200, contentType, payload)
    }
    catch(err) {
        if(err.code === 'ENOENT') {
            const payload = await fs.readFile(path.join(publicDir, '404.html'))
            sendResponse(res, 404, 'text/html', payload)
        }
        else {
            sendResponse(res, 500, 'text/html', '<html><h1>Server Error: ${err.code}</h1></html>')
        }
    }
}