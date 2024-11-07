module.exports = (sequelize, Sequelize) => {
    return sequelize.define("lesson_students", {
        visit: {
            type: Sequelize.BOOLEAN,
            allowNull: false,
            defaultValue: false
        }
    },{
        timestamps: false
    })
}