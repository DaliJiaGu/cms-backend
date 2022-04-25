const mysql = require('mysql2');
const config = require('./config');

const connections = mysql.createPool({
  host: config.MYSQL_HOST,
  port: config.MYSQL_PORT,
  database: config.MYSQL_DATABASE,
  user: config.MYSQL_USER,
  password: config.MYSQL_PASSWORD
})

// 检测连接是否成功
connections.getConnection((err, connection) => {
  connection.connect((err) => {
    if(err){
      console.log('数据库连接失败',err);
    }else{
      console.log('数据库连接成功');
    }
  })
})

module.exports = connections.promise();