/**
 * File with standard checks for query parameters.
 */

//TODO: На каждый метод можно сделать юнит тесты

/**
 * Transformation and validation of the id list from string to array
 * @param {string} ids - format "1,2,3,5"
 * @returns {array} - checked IDs array [1,2,3,5]
 */
exports.idsEnumeration = (ids) => {
    try {
        // ids formating
        // formating
        return [];
    } catch (err) {
        throw err;
    }
}

/**
 * Checking the "Date" parameter of the request for query by range or start date
 * @param {string} date - format YYYY-MM-DD or YYYY-MM-DD,YYYY-MM-DD (range)
 * @returns {object} - an object with the start and end properties (if not specified, will return false to end and start)
 */
exports.date = (date) => {
    try {
        // date test
        // formating
        return {
            start: false,
            end: false
        };
    } catch (err) {
        throw err;
    }
}

/**
 * Checking the "Status" parameter of the request
 * @param {number} status - 1 or 0
 * @returns {boolean} - boolean value
 */
exports.status = (status) => {
    try {
        // status test
        // formating
        return false;
    } catch (err) {
        throw err;
    }
}

/**
 * Checking for a range of numbers
 * @param range - Range of numbers in format "1,4" -> 1,2,3,4
 * @returns {object} - Object with start and end parameters (if not specified, will return false to end and start)
 */
exports.numericRange = (range) => {
    try {
        // status test
        // formating
        return {
            start: false,
            end: false
        };
    } catch (err) {
        throw err;
    }
}

/**
 * Transforming page number to SQL offset
 * @param page - page number
 * @returns {number} - SQL offset
 */
exports.pageToOffset = (page) => {
    try {
        // status test
        // formating
        return 0;
    } catch (err) {
        throw err;
    }
}


/**
 * Limits on the number of items per request
 * @param count - Number of items requested
 * @returns {number} - Limit for SQL
 */
exports.limiting = (count) => {
    try {
        // status test
        // formating
        return 0;
    } catch (err) {
        throw err;
    }
}