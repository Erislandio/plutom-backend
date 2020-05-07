const { model, Schema } = require("mongoose");

const accountsSchema = new Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  appKey: {
    type: String,
    required: true,
    unique: true,
  },
  appToken: {
    type: String,
    required: true,
    unique: true,
  },
  userId: {
    type: String,
    required: true,
  },
});

const Accounts = model("Accounts", accountsSchema);

module.exports = Accounts;
