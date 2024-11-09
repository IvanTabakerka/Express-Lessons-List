module.exports = (sequelize) => {
    return sequelize.define("lesson_teachers", {
    },{
        indexes: [
            {
                fields: ['lesson_id', 'teacher_id'],
                using: 'BTREE'
            }
        ],
        timestamps: false
    })
}