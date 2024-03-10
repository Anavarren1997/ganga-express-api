import mysql from 'mysql2/promise';

const connection = await mysql.createConnection({
  host: 'localhost',
  port: '3306',
  user: 'sporttia',
  password: 'sporttia',
  database: 'gangaexpresss_dev',
});

export default connection;
