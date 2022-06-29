const Sequelize = require('sequelize');
const db = new Sequelize('date_db', 'root', '60853008', {
   host: "localhost",
   dialect: "mysql"
});
module.exports = {db};