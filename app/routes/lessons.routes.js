module.exports = app => {
    const router = require("express").Router();
    const controllers = require('../controllers/lessons.controllers');

    router.get("", controllers.get);

    app.use('/lessons', router);
};
