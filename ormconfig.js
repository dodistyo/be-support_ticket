const rootDir = process.env.NODE_ENV === "development" ?
  "src" :
  "build/src"

module.exports = {
  "type": "mariadb",
  "host": "localhost",
  "port": 3306,
  "username": "root",
  "password": "root",
  "database": "support_ticket",
  "synchronize": true,
  "logging": false,
  "entities": [rootDir + "/entities/**/*.{js,ts}"],
  "migrations": [rootDir + "/migrations/*.{js,ts}"],
  "subscribers": [rootDir + "/subscribers/**/*.{js,ts}"],
  "seeds": [rootDir + "/migrations/seeds/**/*.{js,ts}"],
  "factories": [rootDir + "/migrations/factories/**/*.{js,ts}"],
} 
