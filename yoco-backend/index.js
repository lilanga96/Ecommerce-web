require('dotenv').config();
const express = require('express');
const axios = require('axios');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(cors()); // Allow frontend to access backend

const YOCO_SECRET_KEY = process.env.YOCO_SECRET_KEY; // Store key in .env

app.post('/pay', async (req, res) => {
    try {
        const { token } = req.body;
        const response = await axios.post('https://online.yoco.com/v1/charges/', {
            token: token,
            currency: 'ZAR',
            amountInCents: 5000
        }, {
            headers: { 'X-Auth-Secret-Key': YOCO_SECRET_KEY }
        });

        res.json(response.data);
    } catch (error) {
        res.status(500).json(error.response ? error.response.data : { message: "Payment failed" });
    }
});

app.listen(PORT, () => console.log(`✅ Server running on port ${PORT}`));
