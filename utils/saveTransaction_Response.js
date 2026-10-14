import path from 'node:path'
import fs from 'node:fs/promises'
import { sendEmailConfirmation } from './sendEmailConfirmation.js'

export async function saveTransaction(parsedBody) {
    try {
        const { userEmail, timeStamp, amountPaid, pricePerOz, goldAmount } = parsedBody

        const transactionRecord = `Time: ${timeStamp}, Amount paid: ${amountPaid}, Price per Oz: ${pricePerOz}, Gold sold: ${goldAmount} \n`
        
        const pathToTxt = path.join('data', 'transactions.txt')
        
        sendEmailConfirmation(parsedBody)

        await fs.appendFile(pathToTxt, transactionRecord, 'utf-8')
    }
    catch(err) {
        throw new Error(err)
    }
}