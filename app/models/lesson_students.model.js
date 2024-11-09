module.exports = (sequelize, Sequelize) => {
    return sequelize.define("lesson_students", {
        visit: {
            type: Sequelize.BOOLEAN,
            allowNull: false,
            defaultValue: false
        }
    },{
        indexes: [
            {
                fields: ['lesson_id', 'visit'],
                using: 'BTREE'
            },
            {
                fields: ['lesson_id', 'student_id'],
                using: 'BTREE'
            }
        ],
        timestamps: false
    })
}