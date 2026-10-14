import { getGoldPrice } from "../utils/getGoldPrice.js"
import { parseJSONBody } from "../utils/parseJSONBody.js"
import { sendResponse } from "../utils/sendResponse.js"
import { saveTransaction } from "../utils/saveTransaction_Response.js"

export async function handlePrice(res) {
    res.statusCode = 200
    res.setHeader('Content-Type', 'text/event-stream')
    res.setHeader('Cache-Control', 'no-cache')
    res.setHeader('Connection', 'keep-alive')


    setInterval(async () => {
        const endPrice = await getGoldPrice()
        res.write(
            `data: ${JSON.stringify({ event: 'priceUpdate', price: endPrice })}\n\n`
        )
    }, 5000)
}

export async function handlePost(req, res) {
    try {
        const parsedBody = await parseJSONBody(req)
        saveTransaction(parsedBody)
        sendResponse(res, 201, 'application/json', JSON.stringify(parsedBody))
    }
    catch (err) {
        sendResponse(res, 400, 'application/json', JSON.stringify({ error: err }))
    }
}