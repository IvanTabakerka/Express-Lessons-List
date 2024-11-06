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
        if (ids) {
            return ids.trim().split(",").map(id => +id).filter(id => Number.isInteger(id));
        } else {
            return [];
        }
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
        if (date) {
            const [start, end] = date.split(',', 2).map(date => date.trim());
            const regExp = new RegExp('^[0-9]{4}-(1[0-2]|0[1-9])-(3[01]|[12][0-9]|0[1-9])$');

            if ((!regExp.test(start)) || (!regExp.test(end) && end)) throw ({status: 400, message: 'Не верно введена дата'});

            return {
                start: start,
                end: end ? end : false
            }
        } else {
            return {
                start: false,
                end: false
            };
        }
    } catch (err) {
        throw err;
    }
}

/**
 * Checking the "Status" parameter of the request
 * @param {number} status - 1 or 0
 * @param {string} name - status viewed name
 * @returns {object} - object with properties allow (allow query by parameter) and status (parameter value)
 */
exports.status = (status, name) => {
    try {
        if (!name) throw new Error('When using this method, you must specify the status name');

        if (status) {
            if (status !== '0' && status !== '1') throw ({status: 400, message: `Для статуса ${name} разрешены только значения 0 и 1`});

            return {
                allow: true,
                status: status === '1'
            }
        } else {
            return {
                allow: false
            }
        }
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