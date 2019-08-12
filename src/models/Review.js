export default (sequelize, DateTypes) => {
    const Review = sequelize.define('review', {
        id: {
            type: DateTypes.UUID,
            defaultValue: DateTypes.UUIDV4,
            primaryKey: true
        },
        rating: {
            type: DateTypes.INTEGER,
            allowNull: false,
        },
        text: {
            type: DateTypes.STRING,
            allowNull: false,
        },
    }, {
        underscored: true,
        timestamps: true,
    });

    Review.associate = ({Product, User}) => {
        Review.belongsTo(Product);
        Review.belongsTo(User);
    };

    Review.prototype.toJSON = function () {
        const data = this.dataValues;
        delete data.createdAt;
        delete data.updatedAt;
        return data;
    };

    return Review;
};