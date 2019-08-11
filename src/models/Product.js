export default (sequelize, DateTypes) => {
    const Product = sequelize.define('product', {
        id: {
            type: DateTypes.UUID,
            defaultValue: DateTypes.UUIDV4,
            primaryKey: true
        },
        title: {
            type: DateTypes.STRING,
            allowNull: false,
        },
        description: {
            type: DateTypes.STRING,
            allowNull: false,
        },
    }, {
        underscored: true,
        timestamps: true,
    });

    Product.associate = ({User}) => {
        Product.belongsTo(User);
    };

    return Product;
};