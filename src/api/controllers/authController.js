const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const authConfig = require("../../config/auth.json");

function generateToken(params = {}) {
  return jwt.sign(params, authConfig.secret, {
    expiresIn: 86400,
  });
}

module.exports = {
  async login(req, res) {
    const { email, password } = req.body;

    try {
      const user = await User.findOne({ email }).select("+password");

      if (!user) return res.status(200).send({ error: "not found" });

      if (!(await bcrypt.compare(password, user.password)))
        return res.status(200).send({ error: "Senha incorreta" });

      user.password = null;

      res.status(200).send({
        user,
        token: generateToken({ id: user.id }),
      });
    } catch (error) {
      return res.send(error);
    }
  },
};
