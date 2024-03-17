import Server from './server';
import Database from './database';

const PORT = 3000;

// Inicializando la base de datos
const db = Database.getInstance();
const dbPool = db.getPool();

// Inicializando el servidor
const server = new Server();
server.start(PORT);

// Exportamos dbPool si necesitamos usarlo en otros lugares, como en los modelos
export { dbPool };
