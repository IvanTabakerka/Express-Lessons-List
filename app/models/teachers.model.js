module.exports = (sequelize, Sequelize) => {
    return sequelize.define("teachers", {
        id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true,
            allowNull: false
        },
        name: {
            type: Sequelize.STRING(10),
            allowNull: true
        }
    },{
        timestamps: false
    })
}