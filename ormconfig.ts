// ormconfig.ts

import { ConnectionOptions } from 'typeorm';

const config: ConnectionOptions = {
  type: 'sqlite',
  database: 'path_to_your_database.db', // Replace with your SQLite database file path
  entities: [__dirname + '/entities/*.ts'], // Specify your entity classes' locations
  synchronize: true, // Set to true for development; false for production
  logging: true, // Set to true to see SQL queries in the console
};

export default config;
