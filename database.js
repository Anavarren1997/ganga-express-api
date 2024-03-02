import mysql from 'mysql2/promise';

const connection = mysql.createConnection({
  host: 'localhost',
  port: '3306',
  user: 'sporttia',
  password: 'sporttia',
  database: 'gangaexpress_dev',
});

export default connection;
