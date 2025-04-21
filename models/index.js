const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

// === MODELS ===

// Customer
const Customer = sequelize.define('customer', {
  firstname: { type: DataTypes.STRING(50), allowNull: false },
  lastname: { type: DataTypes.STRING(50), allowNull: false },
  email: { type: DataTypes.STRING(50), allowNull: false, unique: true },
  phonenumber: { type: DataTypes.STRING(50), allowNull: false, unique: true }
},{
  tableName: 'customers',
  timestamps: false // 👈 disables createdAt & updatedAt 
});

// Cook
const Cook = sequelize.define('cook', {
  firstname: { type: DataTypes.STRING(50), allowNull: false },
  lastname: { type: DataTypes.STRING(50), allowNull: false },
  phonenumber: { type: DataTypes.STRING(50), allowNull: false, unique: true },
  email: { type: DataTypes.STRING(50), allowNull: false, unique: true }
},{
  tableName: 'cooks',
  timestamps: false // 👈 disables createdAt & updatedAt 
});

// Table
const Table = sequelize.define('table', {
  name: { type: DataTypes.STRING(50), allowNull: false },
  description: { type: DataTypes.STRING(50) }
},{
  tableName: 'tables',
  timestamps: false // 👈 disables createdAt & updatedAt 
});

// Product
const Product = sequelize.define('product', {
  name: { type: DataTypes.STRING(50), allowNull: false },
  description: { type: DataTypes.STRING(50) }
},{
  tableName: 'products',
  timestamps: false // 👈 disables createdAt & updatedAt 
});

// Menu
const Menu = sequelize.define('menu', {
  name: { type: DataTypes.STRING(50), allowNull: false },
  description: { type: DataTypes.STRING(50) },
  day: { type: DataTypes.INTEGER, allowNull: false },
  price: { type: DataTypes.DECIMAL, allowNull: false }
},{
  tableName: 'menus',
  timestamps: false // 👈 disables createdAt & updatedAt 
});

// Reservation
const Reservation = sequelize.define('reservation', {
  date: { type: DataTypes.DATEONLY, allowNull: false }
},{
  tableName: 'reservations',
  timestamps: false // 👈 disables createdAt & updatedAt 
});

// === RELATIONS ===

// Reservation belongs to Customer, Menu, Table
Reservation.belongsTo(Customer, { foreignKey: { allowNull: false } });
Reservation.belongsTo(Menu, { foreignKey: { allowNull: false } });
Reservation.belongsTo(Table, { foreignKey: { allowNull: false } });

// Customer has many Reservations
Customer.hasMany(Reservation);

// Table has many Reservations
Table.hasMany(Reservation);

// Menu has many Reservations
Menu.hasMany(Reservation);

// Menu <-> Product (many-to-many)
const MenuProduct = sequelize.define('menuProduct', {}, { timestamps: false });
Menu.belongsToMany(Product, { through: MenuProduct });
Product.belongsToMany(Menu, { through: MenuProduct });

// Menu <-> Cook (many-to-many)
const MenuCooked = sequelize.define('menuCooked', {}, { timestamps: false });
Menu.belongsToMany(Cook, { through: MenuCooked });
Cook.belongsToMany(Menu, { through: MenuCooked });

// === EXPORT ===
module.exports = {
  sequelize,
  Customer,
  Cook,
  Table,
  Product,
  Menu,
  Reservation,
  MenusProduct: MenuProduct,
  MenusCooked: MenuCooked
};
