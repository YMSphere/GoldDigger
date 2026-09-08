const priceDisplay = document.getElementById('price-display')
const eventSource = new EventSource('/api/live_prices')
const conectionStatus = document.getElementById('connection-status')
const investBtn =document.getElementById('invest-btn')
// const dialog = document.querySelector(dialog.outputs)

conectionStatus.textContent = 'Disconnected 🔴'


eventSource.onmessage = event => {
    const data = JSON.parse(event.data)
    const justPrice = data.price
    priceDisplay.textContent = justPrice
    if(conectionStatus.textContent !== 'Live Price 🟢') {
        conectionStatus.textContent = 'Live Price 🟢'
    }
}

eventSource.onerror = () => {
    priceDisplay.textContent = '----.--'
    conectionStatus.textContent = 'Disconnected 🔴'
    console.log('Connection lost. Attempting to reconnect...')
}

investBtn.addEventListener('click', e => {
    e.preventDefault()
    console.log('You have invested!')
})
function openDialog() {
    // console.log(dialog)
}

// openDialog()
