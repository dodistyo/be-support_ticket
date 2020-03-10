const rootDir = process.env.NODE_ENV === "development" ?
  "src" :
  "build"

module.exports = {
  "type": "mariadb",
  "host": "localhost",
  "port": 3306,
  "username": "root",
  "password": "root",
  "database": "support_ticket",
  "synchronize": true,
  "logging": false,
  "entities": [rootDir + "/entity/**/*.{js,ts}"],
  "migrations": [rootDir + "/migration/*.{js,ts}"],
  "subscribers": [rootDir + "/subscriber/**/*.{js,ts}"],
  "seeds": [rootDir + "/migration/seeds/**/*.{js,ts}"],
  "factories": [rootDir + "/migration/factories/**/*.{js,ts}"],
} 
