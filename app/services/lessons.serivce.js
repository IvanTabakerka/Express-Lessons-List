const db = require('../models')

exports.lessonsGet = async (date, status, teacherIds, studentsCount, page, lessonsPerPage) => {
    try {
        let res = {
            status: true
        }

        const elements = await db.lessons.findAll();

        elements.forEach(les => console.log(les))



        throw new Error('TETS');
    } catch (err) {
        throw err;
    }
}
