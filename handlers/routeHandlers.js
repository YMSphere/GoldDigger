import { getGoldPrice } from "../utils/getGoldPrice.js"

export async function handlePrice(req, res) {
    res.statusCode = 200
    res.setHeader('Content-Type', 'text/event-stream')
    res.setHeader('Cache-Control', 'no-cache')
    res.setHeader('Connection', 'keep-alive')

    
    setInterval(async () => {
        const endPrice =  await getGoldPrice()
        res.write(
            `data: ${JSON.stringify({event: 'priceUpdate', price: endPrice})}\n\n`
        )
    }, 5000)
}