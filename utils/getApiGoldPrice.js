export async function getApiGoldPrice() {
    const apiKey = process.env.GOLD_API_KEY
    if(!apiKey){
        throw new Error('Missing GOLD_API_KEY in environment variables')
    }
    const reqOptions = {
        method: 'GET',
        headers: {
            'x-access-token': apiKey,
            'Content-Type': 'application/json'
        }
    }
    const res = await fetch("https://www.goldapi.io/api/price/XAU/USD", reqOptions)
    const data = await res.json()
    const price = Number(data.price)
    return price
}