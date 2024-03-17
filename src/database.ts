// database.ts
import { createPool } from 'mysql2/promise';

class Database {
  private static instance: Database;
  private pool: any;

  private constructor() {
    this.pool = createPool({
      host: 'localhost',
      port: 3306,
      user: 'sporttia',
      password: 'sporttia',
      database: 'gangaexpresss_dev',
      waitForConnections: true,
      connectionLimit: 10,
      queueLimit: 0,
    });
  }

  public static getInstance(): Database {
    if (!Database.instance) {
      Database.instance = new Database();
    }
    return Database.instance;
  }

  public getPool() {
    return this.pool;
  }
}

export default Database;
