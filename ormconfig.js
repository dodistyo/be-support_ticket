const rootDir = process.env.NODE_ENV === "development" ?
  "src" :
  "build"

module.exports = {
  "type": "mariadb",
  "host": process.env.DB_HOST,
  "port": process.env.DB_PORT,
  "username": process.env.DB_USERNAME,
  "password": process.env.DB_PASSWORD,
  "database": process.env.DB_NAME,
  "synchronize": true,
  "logging": false,
  "entities": [rootDir + "/entity/**/*.{js,ts}"],
  "migrations": [rootDir + "/migration/*.{js,ts}"],
  "subscribers": [rootDir + "/subscriber/**/*.{js,ts}"],
  "seeds": [rootDir + "/migration/seeds/**/*.{js,ts}"],
  "factories": [rootDir + "/migration/factories/**/*.{js,ts}"]
} 
