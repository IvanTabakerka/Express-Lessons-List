/**
 * Handling an error in a route
 * @param error - error object from try/catch
 * @param res - express response methods
 */
exports.express = (error, res) => {
    switch (error.status) {
        case 400:
            res.status(400).send({error: error.message})
            break;
        // Can be expanded with new ones HTTP codes
        // case 403:
        //    res.status(403).send({error: 'Доступ запрещен'})
        //    break;
        default:
            console.error(error);
            res.status(500).json({error: 'Критическая ошибка'});
    }
}