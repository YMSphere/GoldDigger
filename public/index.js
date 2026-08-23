const priceDisplay = document.getElementById('price-display')
const eventSource = new EventSource('/api/live_prices')

eventSource.onmessage = event => {
    const data = JSON.parse(event.data)
    const justPrice = data.price
    priceDisplay.textContent = justPrice
}

eventSource.onerror = () => {
    priceDisplay.textContent = `----.--`
    console.log(`Connection lost. Attempting to reconnect...`)
}

