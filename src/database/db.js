const mongoose = require("mongoose");

module.exports = mongoose.connect(
  process.env.MONGODB_URI ||
    "mongodb://admin:admin12345@ds161312.mlab.com:61312/plutom",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
);
