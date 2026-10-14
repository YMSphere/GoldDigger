import { getApiGoldPrice } from "./getApiGoldPrice.js";

let currentGoldPrice = ''

function simulateGoldPriceLive() {
    const maxChangePercent = 0.001

    const changeDirection = (Math.random() - 0.5) * 2

    const priceChange = currentGoldPrice * maxChangePercent * changeDirection

    currentGoldPrice = currentGoldPrice += priceChange

    return Number(currentGoldPrice).toFixed(2)
}

export async function getGoldPrice() {
    if (!currentGoldPrice) {
        currentGoldPrice = await getApiGoldPrice()
        return currentGoldPrice
    }
    else {
        return simulateGoldPriceLive()
    }
}

