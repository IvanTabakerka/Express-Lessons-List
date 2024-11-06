module.exports = {
    HOST: "localhost",
    USER: "lessons",
    PASSWORD: "lessons",
    PORT: 5432,
    DB: "lessons",
    dialect: "postgres",
    operatorsAliases: 0,
    pool: {
        max: 5,
        min: 0,
        acquire: 3000,
        idle: 10000
    },
    logging: false,
    force: false
};
