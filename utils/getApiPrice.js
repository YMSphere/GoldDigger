export async function getApiPrice() {
    const res = await fetch("https://api.binance.com/api/v3/ticker/price?symbol=BTCUSDT")
    const data = await res.json()
    const price = Number(data.price)
    return price
}