require('dotenv').config();
const express = require('express');
const axios = require('axios');
const cors = require('cors');
const nodemailer = require('nodemailer');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(cors()); // Allow frontend to access backend


//YOCO Payment processing
const YOCO_SECRET_KEY = process.env.YOCO_SECRET_KEY; // Store key in .env

// EMAIL Processing
const transporter = nodemailer.createTransport({
    host: 'mail.isintu.org.za',
    port: 465,
    secure: true,
    auth: {
        user: 'isintu@isintu.org.za', // Store this in .env
        pass: '@Asi201512', // Store this in .env
    },
    tls: {
        rejectUnauthorized: false,
    },
    debug: true, // Enable debug output
    logger: true, // Log SMTP transactions
});

app.post('/pay', async (req, res) => {

    try {
        const { token, email } = req.body;
        if (!email) {
            return res.status(400).json({ message: "Email is required for confirmation." });
        }

        const response = await axios.post('https://online.yoco.com/v1/charges/', {
            token: token,
            currency: 'ZAR',
            amountInCents: 5000
        }, {
            headers: { 'X-Auth-Secret-Key': YOCO_SECRET_KEY }
        });

                // If payment is successful, send confirmation email
                if (response.data.status === "successful") {
                    const emailBody = `
                        <h2>Payment Confirmation</h2>
                        <p>Dear Customer,</p>
                        <p>Your payment of R50.00 has been successfully processed.</p>
                        <p>Transaction ID: ${response.data.id}</p>
                        <p>Thank you for your purchase!</p>
                    `;
        
                    await transporter.sendMail({
                        from: '"Isintu" <isintu@isintu.org.za>', // Sender
                        to: `${email}`, // Receiver
                        subject: 'Payment Confirmation',
                        html: emailBody,
                    });
        
                    console.log(`Email sent to ${email}`);
                }
        
                res.json(response.data);

    } catch (error) {
        console.error('Payment error:', error);
        res.status(500).json(error.response ? error.response.data : { message: "Payment failed" });
    }
});




// app.post('/send-email', async (req, res) => {
//     const { email,  } = req.body; // Get both email and message from request

//     // Basic validation
//     if (!email) {
//         return res.status(400).json({ message: 'Email and message are required.' });
//     }

//     const emailBody = `<p>email confirmation</p>`; // Construct email body

//     try {
//         // Send verification email
//         const info = await transporter.sendMail({
//             from: '"Isintu" <isintu@isintu.org.za>', // Sender
//             to: `${email}`, // Receiver
//             subject: 'Order Confirmation',
//             html: emailBody,
//         });

//         console.log('Email sent:', info.messageId);
//         res.status(200).json({ message: 'Email sent successfully.' });

//     } catch (error) {
//         console.error('Error sending email:', error);
//         res.status(500).json({ message: 'Internal server error.' });
//     }
// });
app.listen(PORT, () => console.log(`✅ Server running on port ${PORT}`));
