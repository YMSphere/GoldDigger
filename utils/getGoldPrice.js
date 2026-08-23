import { getApiPrice } from "./getApiPrice.js";

let currentGoldPrice = ''

function simulateGoldPriceLive() {
    const maxChangePercent = 0.001

    const changeDirection = (Math.random() - 0.5) * 2
    
    const priceChange = currentGoldPrice * maxChangePercent * changeDirection

    currentGoldPrice = Math.floor(currentGoldPrice += priceChange)

    console.log(`Just message from randomiser price function`)

    return currentGoldPrice
}

export async function getGoldPrice() {
    if (!currentGoldPrice) {
        currentGoldPrice = await getApiPrice()
        console.log(`Prise after API: ${currentGoldPrice}`)
        return currentGoldPrice
    }
    else {
        console.log(`Current gold Prise: ${currentGoldPrice}`)
        return simulateGoldPriceLive()
    }
}

