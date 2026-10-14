const priceDisplay = document.getElementById('price-display')
const eventSource = new EventSource('/api/live_prices')
const conectionStatus = document.getElementById('connection-status')
const form = document.querySelector('form')
const inputInvestmentAmount = document.getElementById('investment-amount')
const userEmail = document.getElementById('user-email')
const dialog = document.querySelector('dialog')
const dialogOkBtn = dialog.querySelector('button')

conectionStatus.textContent = 'Disconnected 🔴'
toggleFormState(true)


eventSource.onmessage = event => {
    const data = JSON.parse(event.data)
    const justPrice = data.price
    priceDisplay.textContent = justPrice
    if (conectionStatus.textContent !== 'Live Price 🟢') {
        conectionStatus.textContent = 'Live Price 🟢'
        toggleFormState(false)
    }
}

eventSource.onerror = () => {
    priceDisplay.textContent = '----.--'
    conectionStatus.textContent = 'Disconnected 🔴'
    toggleFormState(true)
    console.log('Connection lost. Attempting to reconnect...')
}

form.addEventListener('submit', async e => {
    e.preventDefault()
    const userEmailValue = userEmail.value
    const invetsmentValue = inputInvestmentAmount.value
    const goldAmount = purchasedAmountGold(invetsmentValue, priceDisplay.textContent)
    const transactionTime = new Date().toISOString()

    const purchasedData = {
        userEmail: userEmailValue,
        timeStamp: transactionTime,
        amountPaid: invetsmentValue,
        pricePerOz: priceDisplay.textContent,
        goldAmount: goldAmount
    }

    try {
        const response = await fetch('/api/buy', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(purchasedData)
        })

        if (!response.ok) {
            throw new Error(response.status)
        }

        displayDialog(true, 201, goldAmount, invetsmentValue)
    }
    catch (err) {
        displayDialog(false, err)
    }
})



function displayDialog(isSuccess, status, goldAmount, inputValue) {
    if (isSuccess) {
        dialog.querySelector('#investment-summary').textContent = `You just bought ${goldAmount} ounces (ozt) for $${inputValue}. \n You will receive documentation shortly.`
    }
    else {
        dialog.querySelector('#investment-summary').textContent = `Sorry, there is a problem. ${status}`
    }
    dialog.showModal()
}

function purchasedAmountGold(investedValue, pricePerOunce) {
    const purchasedAmountG = Number(investedValue) / Number(pricePerOunce)
    return purchasedAmountG.toFixed(4)
}

dialogOkBtn.addEventListener('click', () => {
    dialog.close()
})

function toggleFormState(isDisabled) {
    form.querySelectorAll('input, button').forEach(element => {
        element.disabled = isDisabled
    })
}

