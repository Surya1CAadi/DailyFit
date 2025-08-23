const express = require("express");
const morgan = require("morgan"); //a middleware that logs requests onto the console
const app = express();
const helmet = require("helmet"); //adds additional HTTP headers
const mongoSanitize = require("express-mongo-sanitize"); //sanitize the mongo input
const xss = require("xss-clean"); //removes malicious code from input
const cors = require("cors"); //prevents cors blockage
const cookieParser = require("cookie-parser");
const rateLimit = require('express-rate-limit')


// security HTTP headers
app.use(helmet());

//for hoster proxy and cors
app.set("trust proxy", 1);
app.use(cors({
    credentials: true,
    origin: process.env.NODE_ENV === "development" ? "http://localhost:5173" : "https://www.ducklingfit.com",
}));

// read data from the body into req.body, max is 10kb.
app.use(express.json({limit: "10kb"})); //data from body shall be added to req

//sanitize against non SQL code injection
app.use(mongoSanitize());

//sanitize against xss
//will convert html dilemeters to entity;
app.use(xss());

//to work with cookies
app.use(cookieParser())

//to print requests in log
app.use(morgan("dev"));

app.get("/", (req, res, next) => {
    res.status(200).json({
        status: "success",
        message: "Welcome to Duck server!",
    });
});

app.get("/test", async (req, res, next) => {
    res.status(200).json({
        status: "success",
        message: "this is for testing functions",
        date: new Date(),
        tz: new Date().getTimezoneOffset()
    });
});

//defining routers

app.post("/clearSiteData",(req,res,next)=>{
    res.setHeader("Clear-Site-Data", "\"*\"").json({
        status:"success",
        message: "site data clear requested."
    });
});

//in case of operational error this middleware function will be called to return relevant error message
app.use(globalErrorController);

module.exports = app;
