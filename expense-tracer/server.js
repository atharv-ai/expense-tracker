const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const authRout = require('./routers/authRoutes');
const {protect} = require('./middlewares/authMiddleware');
const expenseRouters = require('./routers/expenseRoutes');
const cors = require('cors');

dotenv.config();
connectDB();

const app = express();
app.use(express.json());
app.use(cors());

app.get('/',(req,res)=>{
    res.send("Expense Tracker API Running...");
})

app.use('/api/auth',authRout);
app.use("/api/expenses", expenseRouters);
app.get('/api/protected',protect,(req,res) =>{
    res.json({message : "You are authorized", user: req.user});
});

const PORT = process.env.PORT || 3000;
app.listen(PORT,() => {
    console.log("the server is running on port "+ PORT);
})

// module.exports = app;