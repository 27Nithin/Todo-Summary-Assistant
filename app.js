require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGO_URI).then(() => console.log("MongoDB connected"));

app.use('/api/auth', require('./routes/auth.routes'));
app.use('/api/todos', require('./routes/todo.routes'));

app.listen(process.env.PORT, () => console.log(`Server on port ${process.env.PORT}`));
