const { model, Schema } = require("mongoose");

const accountsSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  appKey: {
    type: String,
    required: true,
  },
  appToken: {
    type: String,
    required: true,
  },
  userId: {
    type: String,
    required: true,
  },
});

const Accounts = model("UserAccounts", accountsSchema);

module.exports = Accounts;
