const express = require("express");
const cors = require("cors");

const config = require('./app/config/config');

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
    res.json({
        message: "API is running!"
    });
});

require("./app/routes/lessons.routes")(app);


app.listen(config.port, () => {
    console.log(`App listening on port ${config.port}`)
})

const db = require("./app/models");
const dbConfig = require("./app/config/db");
const fakeData = require("./app/services/util/fakeData.service");

db.sequelize.sync({ force: dbConfig.force }).then(() => {
    console.info("Database is running");
}).catch((err) => {
    console.log(err)
    console.error("Database error: " + err.message);
}).finally(async () => {
    await fakeData.generator()
});


