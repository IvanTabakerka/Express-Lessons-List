const { Faker , ru} = require("@faker-js/faker");

const db = require("../../models");
const dbConfig = require("../../config/db");

const faker = new Faker({
    locale: [ru],
});

exports.generator = async () => {
    try {
        const lessonsCount = await db.lessons.count();

        if (lessonsCount === 0 && dbConfig.fakeDatabase.enable) {
            console.log('Database data start create...')

            const studentsData = Array.from({ length: dbConfig.fakeDatabase.students }, () => ({
                name: faker.person.lastName().slice(0, 10)
            }));
            const students = await db.students.bulkCreate(studentsData);
            console.log('Students created')

            const teachersData = Array.from({ length: dbConfig.fakeDatabase.teachers }, () => ({
                name: faker.person.lastName().slice(0, 10)
            }));
            const teachers = await db.teachers.bulkCreate(teachersData);
            console.log('Teachers created')

            const lessonsData = Array.from({ length: dbConfig.fakeDatabase.lessons }, () => ({
                date: faker.date.between({from: '2023-01-01', to: '2023-12-31'}),
                title: faker.lorem.words(3).slice(0, 100),
                status: faker.datatype.boolean()
            }));
            const lessons = await db.lessons.bulkCreate(lessonsData);
            console.log('Lessons created')

            console.log('Entries create')

            let teachersAccEntries = [];
            let studentsAccEntries = [];

            for (const [index, lesson] of lessons.entries()) {
                const studentCount = faker.number.int({ min: 0, max: 30 });
                const lessonStudents = faker.helpers.arrayElements(students,studentCount);
                const lessonStudentEntries = lessonStudents.map(student => ({
                    lesson_id: lesson.id,
                    student_id: student.id,
                    visit: faker.datatype.boolean()
                }));
                teachersAccEntries = [...teachersAccEntries, ...lessonStudentEntries];

                const teacherCount  = faker.number.int({ min: 0, max: 3 });
                const lessonTeachers  = faker.helpers.arrayElements(teachers,teacherCount);

                const lessonTeacherEntries = lessonTeachers.map(teacher => ({
                    lesson_id: lesson.id,
                    teacher_id: teacher.id
                }));
                studentsAccEntries = [...studentsAccEntries, ...lessonTeacherEntries];


                if ((index % 10000) == 0) {
                    progressBar(dbConfig.fakeDatabase.lessons, index);
                    await db.lessonStudents.bulkCreate(teachersAccEntries);
                    teachersAccEntries = [];
                    await db.lessonTeachers.bulkCreate(studentsAccEntries);
                    studentsAccEntries = [];
                }
            }
            console.clear();
            console.log('Database data is ready.')
        } else {
            console.log(`Database data is ready. Lessons: ${lessonsCount}`)
        }
    } catch (err) {
        throw err;
    }
}

const progressBar = (total, current) => {
    const barLength = 30;
    const progress = Math.floor((current / total) * barLength);
    const empty = barLength - progress;

    const bar = "[" + "■".repeat(progress) + " ".repeat(empty) + "]";
    const percentage = Math.floor((current / total) * 100);

    console.clear();
    console.log(bar + " " + percentage + "%");
}