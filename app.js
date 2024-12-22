const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const app = express();
const mongoose = require("mongoose");
const categorieRouter = require("./routes/categorie.route");
const scategorieRouter = require("./routes/scategorie.route");
const articleRouter = require("./routes/article.route");
const paymentStripeRouter =require("./routes/paymentStripe.route.js");
const userRouter =require("./routes/user.route")
app.use(express.json());
app.use('/api/users', userRouter);
app.use('/api/paymentStripe', paymentStripeRouter);
dotenv.config();

// Enable CORS for all routes
app.use(cors({
    origin: '*', // Allow all origins
    methods: ['GET', 'POST', 'PUT', 'DELETE'], // Specify allowed HTTP methods
    allowedHeaders: ['Content-Type', 'Authorization'], // Specify allowed headers
}));

// Parse JSON requests


// Route setup
app.use("/api/categorie", categorieRouter);
app.use("/api/scategorie", scategorieRouter);
app.use("/api/article", articleRouter);

app.get("/acceuil", (req, res) => {
    res.send("page acceuil");
});

// Connect to the database
mongoose.connect(process.env.DATABASECLOUD, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
    .then(() => {
        console.log("DataBase Successfully Connected");
    })
    .catch(err => {
        console.log("Unable to connect to database", err);
        process.exit();
    });

// Start the server
app.listen(process.env.PORT, () =>
    console.log(`App running on port ${process.env.PORT}`)
);
