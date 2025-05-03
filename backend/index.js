const express = require("express");
const app = express();
var cors = require('cors');
const connectToMongoose = require("./db");

const PORT = 5000;

//To allow backend-frontend connection
app.use(cors());

app.use(express.json());

connectToMongoose();

app.use("/api",require("./routes/shorten"));

app.get("/",() => {
    console.log("Everything working well!");
})

app.listen(PORT, () => {
    console.log(`App listening on port ${PORT}....`);
})