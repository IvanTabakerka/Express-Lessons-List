const dbConfig = require("../config/db");

// Connection
const Sequelize = require("sequelize");
const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
    host: dbConfig.HOST,
    port: dbConfig.PORT,
    dialect: dbConfig.dialect,
    benchmark: dbConfig.logging,
    logging: dbConfig.logging ? (msg, time) => {
        console.log(`SQL Query: ${msg} - Time: ${time}ms`);
    } : false,
    operatorsAliases: dbConfig.operatorsAliases,
    pool: {
        max: dbConfig.pool.max,
        min: dbConfig.pool.min,
        acquire: dbConfig.pool.acquire,
        idle: dbConfig.pool.idle
    }
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

// Define models
db.lessons = require("./lessons.model")(sequelize, Sequelize);
db.lessonStudents = require("./lesson_students.model")(sequelize, Sequelize);
db.lessonTeachers = require("./lesson_teachers.model")(sequelize, Sequelize);
db.students = require("./students.model")(sequelize, Sequelize);
db.teachers = require("./teachers.model")(sequelize, Sequelize);

// Table relation

// Lessons to students
db.lessons.belongsToMany(db.students, {
    through: {
        model: db.lessonStudents
    },
    foreignKey: 'lesson_id',
    otherKey: 'student_id'
});

// Lessons to teachers
db.lessons.belongsToMany(db.teachers, {
    through: {
        model: db.lessonTeachers
    },
    foreignKey: 'lesson_id',
    otherKey: 'teacher_id'
});

module.exports = db;
