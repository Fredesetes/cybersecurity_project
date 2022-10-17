export default {
  HOST: "localhost",
  PORT: 3306,
  USER: "root",
  //PASSWORD: "fntyis63s1",
  PASSWORD: "",
  DB: "FuryDB",
  dialect: "mysql",
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  }
}