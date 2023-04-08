const mongoose = require('mongoose');

class DataBase {
  constructor() {
    this.connect();
  }
  connect() {
    mongoose
      .connect(process.env.mongoDb)
      .then(() => {
        console.log(`MongoDb connection success!`);
      })
      .catch((err) => {
        console.log(err.message);
      });
  }
}

module.exports = new DataBase();
