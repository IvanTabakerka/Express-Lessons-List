const lessonsService = require("../services/lessons.serivce");
const queryChecker = require("../services/util/queryChecker.service");
const errorHandlers = require("../services/util/errorHandlers.service");

/**
 * Request lessons by filter
 * @param req - request data
 * @param res - response methods
 * @returns {Promise<void>}
 */
exports.get = async (req, res) => {
    try {
        // Preparing parameters
        const date= queryChecker.date(req.query.date);
        const status= queryChecker.status(req.query.status);
        const teacherIds = queryChecker.idsEnumeration(req.query.teacherIds);
        const studentsCount = queryChecker.numericRange(req.query.studentsCount);
        const {limit, offset} = queryChecker.paginator(req.query.page, req.query.lessonsPerPage);
        // Database Query
        res.json(await lessonsService.lessonsGet(date, status, teacherIds, studentsCount, limit, offset));
    } catch (error) {
        errorHandlers.express(error, res);
    }
}