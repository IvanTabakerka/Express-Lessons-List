module.exports = (sequelize) => {
    return sequelize.define("lesson_teachers", {
    },{
        timestamps: false
    })
}