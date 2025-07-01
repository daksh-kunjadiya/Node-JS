const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./db/db');
const userRoutes = require('./routes/rouresRoute');

dotenv.config();
const app = express();

connectDB();

app.use(express.json());

app.get('/', (req, res) => res.send('Server is running...'));
app.use('/users', userRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
});
