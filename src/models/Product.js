export default (sequelize, DataTypes) => {
    const Product = sequelize.define('product', {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true
        },
        title: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        description: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        pictures: {
            type: DataTypes.TEXT,
            get: function() {
                return JSON.parse(this.getDataValue('pictures'));
            },
            set: function(val) {
                return this.setDataValue('pictures', JSON.stringify(val));
            }
        }
    }, {
        underscored: true,
        timestamps: true,
    });

    Product.associate = ({ User, Review }) => {
        Product.belongsTo(User);
        Product.hasMany(Review, { onDelete: 'CASCADE' });
    };

    return Product;
};