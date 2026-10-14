import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function sendEmailConfirmation(transactionRecord) {

    (async function () {
        const { userEmail, timeStamp, amountPaid, pricePerOz, goldAmount } = transactionRecord

        const { data, error } = await resend.emails.send({
            from: 'GoldDigger <onboarding@resend.dev>',
            to: [`${userEmail}`],
            subject: 'Confirmation of Purchase',
            html:
                `<h1 style="font-size: 50px">Here is your confirmation and transaction details:</h1>
        <p style="font-size: 30px"><strong>— </strong>Time: ${timeStamp} ⏱️</p>
        <p style="font-size: 30px"><strong>— </strong>Amount Paid: ${amountPaid} 💵</p>
        <p style="font-size: 30px"><strong>— </strong>Price per Oz: ${pricePerOz} 🏷️</p>
        <p style="font-size: 30px"><strong>— </strong>Gold Sold: ${goldAmount} 🪎</p>
        <p style="font-size: 35px"><strong>— </strong>Thank you for trusting the GoldDigger found!🥰</p>
        `,
        });

        if (error) {
            return console.error({ error });
        };
    })();
}