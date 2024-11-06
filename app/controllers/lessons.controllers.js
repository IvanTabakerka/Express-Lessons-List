const lessonsService = require("../services/lessons.serivce");
const errorHandler = require("../services/error.service");

/**
 * Request lessons by filter
 * @param req - request data
 * @param res - response methods
 * @returns {Promise<void>}
 */
exports.get = async (req, res) => {
    try {
        // Preparing parameters

        throw ({
            status: 400,
            message: 'Test'
        })

        // Database Query
        const elements = await lessonsService.lessonsGet(req);

        res.json(elements);
    } catch (error) {
        errorHandler.express(error, res);
    }
}