const db = require('../models')
const { Op } = require('sequelize')

/**
 * Method for query a list of lessons with students and teachers who attended them or were supposed to attend them
 * @param {object} date - an object with the start and end properties (if not specified, will return false to end and start)
 * @param {object} status - object with properties allow (allow query by parameter) and status (parameter value)
 * @param {array} teacherIds - IDs array [1,2,3,5]
 * @param {object} studentsCount - Object with start and end parameters (if not specified, will return false to end and start)
 * @param {number} limit - Limit for SQL
 * @param {number} offset - Offset for SQL
 * @returns {Promise<Object[]>} - List of lessons
 */
exports.lessonsGet = async (date, status, teacherIds, studentsCount, limit, offset) => {
    try {
        // Basic fields for query
        const queryOptions = {
            attributes: {
                include: [
                    [db.sequelize.literal(calculateVisitorsSQL), 'visitCount']
                ]
            },
            limit: limit,
            offset: offset,
            order: [['date', 'DESC']],
            group: ['lessons.id']
        };

        // Query params
        const {where, having} = queryParams(date, status, studentsCount);

        queryOptions.where = where;
        queryOptions.having = having;

        // Query joins
        queryOptions.include = includesCollector(teacherIds);

        return await db.lessons.findAll(queryOptions);
    } catch (err) {
        throw err;
    }
}

/**
 * Dynamic params for main query
 * @param {object} date - an object with the start and end properties (if not specified, will return false to end and start)
 * @param {object} status - object with properties allow (allow query by parameter) and status (parameter value)
 * @param {object} studentsCount - Object with start and end parameters (if not specified, will return false to end and start)
 * @returns {{having: {}, where: {}}}
 */
const queryParams = (date, status, studentsCount) => {
    const res = {
        where: {},
        having: {}
    }
    // Lessons by date
    // Date equals
    if (date.start && !date.end) {
        res.where.date = Date.parse(date.start);
    }
    // Date range
    if (date.start && date.end) {
        res.where.date = {
            [Op.gte]: Date.parse(date.start),
            [Op.lte]: Date.parse(date.end)
        }
    }
    // Lessons by status
    if (status.allow) {
        res.where.status = status.value;
    }
    // Lessons by students count
    // Count equals
    if ((studentsCount.start || studentsCount.start === 0) && !studentsCount.end) {
        res.having = db.Sequelize.literal(`${calculateVisitorsSQL} = ${studentsCount.start}`);
    }
    // Count range
    if ((studentsCount.start || studentsCount.start === 0) && studentsCount.end) {
        res.having = db.Sequelize.literal(`${calculateVisitorsSQL} BETWEEN ${studentsCount.start} AND ${studentsCount.end}`);
    }

    return res;
}

/**
 * Includes for main query
 * @param {array} teacherIds - IDs array [1,2,3,5]
 * @returns {array}
 */
const includesCollector = (teacherIds) => {
    return [
        includeStudents(),
        includeTeachers(teacherIds)
    ];
}

/**
 * Teachers join and deep dynamic params
 * @param {array} teacherIds - IDs array [1,2,3,5]
 * @returns {object}
 */
const includeTeachers = (teacherIds) => {
    let include = {
        model: db.teachers,
        through: {
            attributes: []
        }
    }

    if (teacherIds) {
        include.where = {
            id: teacherIds
        }
        include.require = true;
    }

    return include;
}

/**
 * Students join
 * @returns {object}
 */
const includeStudents = () => {
    return {
        model: db.students,
        attributes: {
            include: [
                'id',
                'name',
                [db.sequelize.literal('"students->lesson_students"."visit"'), 'visit']
            ]
        },
        through: {
            attributes: []
        }
    };
}

/**
 * Subquery for counting the number of students who attended the lesson
 * @type {string}
 */
const calculateVisitorsSQL = `(
    SELECT COUNT(*)
FROM "lesson_students"
WHERE "lesson_students"."lesson_id" = "lessons"."id" AND "lesson_students"."visit" = true
)::int`;