const express = require('express');
const cors = require('cors');
const app = express();
const mongoose = require('mongoose');
require('dotenv').config();
const adminRoutes = require('./routes/adminRoutes');
const productRoute = require('./routes/productRoutes')
const connectDB = require('./config/db');
const cartRoutes = require('./routes/cartRoutes');
const authRoutes = require('./routes/authRoutes');
const { verifyToken } = require('./middleware/verifyToken');
const PORT = process.env.PORT

connectDB();
app.use(cors())
app.use(express.json())

app.use('/api/admin', adminRoutes);
app.use('/products' ,productRoute);
app.use('/cart', cartRoutes);
app.use('/',authRoutes);
app.get('/' , (req,res)=>{

    res.send("Welcome To Home Page")
});
app.listen(PORT,  ()=> console.log(`Server is Runnig On http://localhost:${PORT}`))