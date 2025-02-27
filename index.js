// smart-disposal-backend/index.js

const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const { Pool } = require('pg');
const tf = require('@tensorflow/tfjs-node');
const multer = require('multer');
const fs = require('fs');

const app = express();
app.use(cors());
app.use(bodyParser.json());

// PostgreSQL Database Connection
const pool = new Pool({
    user: 'your_username',
    host: 'your_host',
    database: 'smart_disposal',
    password: 'your_password',
    port: 5432,
});

// AI Model Loading (Mocked for Now)
let model;
(async () => {
    model = await tf.loadLayersModel('file://./model/model.json');
})();

// Multer for image uploads
const upload = multer({ dest: 'uploads/' });

// API Routes
app.post('/api/auth/register', async (req, res) => {
    const { name, email, password } = req.body;
    try {
        const result = await pool.query('INSERT INTO users (name, email, password) VALUES ($1, $2, $3) RETURNING *', [name, email, password]);
        res.json(result.rows[0]);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.post('/api/disposal/scan', upload.single('image'), async (req, res) => {
    try {
        const imageBuffer = fs.readFileSync(req.file.path);
        const tensor = tf.node.decodeImage(imageBuffer);
        const prediction = model.predict(tensor.expandDims(0));
        const category = prediction.argMax(-1).dataSync()[0];

        const disposalMethods = ['Recycle', 'Pharmacy Drop-Off', 'Hazardous Waste'];
        res.json({ category, method: disposalMethods[category] });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.listen(5000, () => {
    console.log('Server running on port 5000');
});
