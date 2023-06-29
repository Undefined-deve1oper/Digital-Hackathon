//dependencies
require("dotenv").config();
require("express-async-errors");
const { clientURL } = require("./URI");
const fileUpload = require("express-fileupload");
const express = require("express");
const cloudinary = require("cloudinary").v2;
const connectDB = require("./db/connect");
const mongoose = require("mongoose");
const initDatabase = require("./startUp/initDatabase");

//security dependencies
const helmet = require("helmet");
const cors = require("cors");
const xss = require("xss-clean");

//app initialization

const app = express();
const server = require("http").createServer(app);
const routes = require("./routes/index");
const PORT = process.env.PORT || 5000;

//cloudinary configuration
cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.CLOUD_API_KEY,
    api_secret: process.env.CLOUD_API_SECRET
});

// middlewares
const errorHandlerMiddleware = require("./middleware/error-handler");
const notFoundMiddleware = require("./middleware/not-found");

app.use(xss());
app.use(helmet());
app.use(express.json());
app.use(fileUpload({ useTempFiles: true }));
app.use(cors({ origin: clientURL }));

// Routes
app.use("/api", routes);
app.use(errorHandlerMiddleware);
app.use(notFoundMiddleware);

const start = async () => {
    try {
        mongoose.connection.once("open", () => {
            // initDatabase();
            console.log("connect");
        });
        await connectDB(process.env.MONGO_URI);
        server.listen(PORT, () =>
            console.log(`Server is listening on port ${PORT}`)
        );
    } catch (error) {
        console.log(error);
    }
};

start();
