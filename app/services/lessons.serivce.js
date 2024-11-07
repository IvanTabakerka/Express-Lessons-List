const db = require('../models')
const { Op } = require('sequelize')

exports.lessonsGet = async (date, status, teacherIds, studentsCount, page, lessonsPerPage) => {
    try {
        let res = {
            status: true
        }

        const elements = await db.lessons.findAll({
            attributes: {
                include: [
                    [db.sequelize.literal(`(
                            SELECT COUNT(*)
                            FROM "lesson_students"
                            WHERE "lesson_students"."lesson_id" = "lessons"."id" AND "lesson_students"."visit" = true
                        )::int`),
                    'visitCount']
                ]
            },
            include: [{
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
            },{
                model: db.teachers,
                through: {
                    attributes: []
                }
            }],
            having: db.Sequelize.literal(`(
                SELECT COUNT(*)
                FROM "lesson_students"
                WHERE "lesson_students"."lesson_id" = "lessons"."id" AND "lesson_students"."visit" = true
            ) > 0`),
            group: ['students.id', 'lessons.id', 'teachers.id', 'students->lesson_students.visit']
        });

        // https://thisisdata.ru/blog/uchimsya-primenyat-okonnyye-funktsii/

// SELECT "lessons"."id", "lessons"."date", "lessons"."title", "lessons"."status",
// COUNT(students.id) OVER (PARTITION BY lessons.id) AS "visitCount",
// "students"."id" AS "students.id",
// "students"."name" AS "students.name",
// "students->lesson_students"."visit" AS "students.lesson_students.visit",
// "students->lesson_students"."lesson_id" AS "students.lesson_students.lesson_id",
// "students->lesson_students"."student_id" AS "students.lesson_students.student_id"
// FROM "lessons" AS "lessons"
// LEFT OUTER JOIN (
// "lesson_students" AS "students->lesson_students"
//   INNER JOIN "students" AS "students"
//   ON "students"."id" = "students->lesson_students"."student_id"
// )
// ON "lessons"."id" = "students->lesson_students"."lesson_id";



        // console.log(elements)
        // elements.forEach(les => console.log(les))

        return elements

        // throw new Error('TETS');
    } catch (err) {
        throw err;
    }
}
