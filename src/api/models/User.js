const { Schema, model } = require("mongoose");
const bcrypt = require("bcrypt");

const UserSchema = new Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
    },
    password: {
      type: String,
      required: true,
    },
    accounts: [],
    isVerified: {
      type: Boolean,
      default: false,
    },
    account: {
      type: Object,
      default: {
        name: String,
        appKey: String,
        appToken: String,
      }
    }
  },
  {
    timestamps: true,
  }
);

UserSchema.pre("create", async function (next) {
  const hash = await bcrypt.hash(this.password, 10);
  this.password = hash;
  next();
});

module.exports = model("User", UserSchema);
