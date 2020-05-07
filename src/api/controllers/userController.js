const User = require("../models/User.js");

module.exports = {
  async store(req, res) {
    try {
      const { email, password } = req.body;

      const newUser = await User.create({
        email,
        password,
      });

      return res.status(201).json(newUser);
    } catch (error) {
      return error;
    }
  },
};
