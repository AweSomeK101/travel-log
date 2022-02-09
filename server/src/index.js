const express = require("express");
const mongoose = require("mongoose");
const morgan = require("morgan");
const helmet = require("helmet");
const cors = require("cors");
const middlewares = require("./middleware");
const logs = require("./api/logs");

const app = express();
app.use(morgan("common"));
app.use(helmet());
app.use(cors({
    origin: "http://localhost:3000",
}));
app.use(express.json());

app.get("/", (req, res) => {
    res.json({
        message: "hello"
    })
});
app.use("/api/log", logs);

app.use(middlewares.notFound);
app.use(middlewares.errorHandler);

mongoose.connect("mongodb://localhost/DB-travelLog", {
    useNewUrlParser: true,
    useUnifiedTopology: true
})

app.listen(6969, () => console.log("server up and running"));