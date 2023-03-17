const mongoose = require("mongoose");

module.exports = () => {
  function connect() {
    mongoose.connect("mongodb://127.0.0.1:27017/woorotest", function (err) {
      if (err) {
        console.error("mongodb connection eroor", err);
      }
      console.log("mongodb connected");
    });
  }
  connect();
  mongoose.connection.on("disconnected", connect);
};
