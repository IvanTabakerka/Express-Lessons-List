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

db.sequelize.sync({ force: dbConfig.force }).then(() => {
    console.info("База данных синхронизирована");
}).catch((err) => {
    console.log(err)
    console.error("Ошибка синхронизации базы данных: " + err.message);
});