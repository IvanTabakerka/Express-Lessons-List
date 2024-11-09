module.exports = {
    HOST: "localhost",
    USER: "lessons_fake",
    PASSWORD: "lessons",
    PORT: 5432,
    DB: "lessons_fake",
    dialect: "postgres",
    operatorsAliases: 0,
    pool: {
        max: 5,
        min: 0,
        acquire: 60000,
        idle: 10000
    },
    logging: false,
    force: false,
    fakeDatabase: {
        enable: false,
        students: 8000,
        teachers: 800,
        lessons: 100000
    }
};
