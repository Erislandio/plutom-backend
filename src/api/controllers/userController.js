const User = require("../models/User.js");
const Accounts = require("../models/Accounts");

module.exports = {
  async store(req, res) {
    try {
      const { email, password } = req.body;

      const user = await User.findOne({ email });

      if (!user) {
        return res.json({
          error: true,
          message: `Email: ${email} already exists`,
        });
      }

      const newUser = await User.create({
        email,
        password,
      });

      newUser.password = null;

      return res.status(201).json(newUser);
    } catch (error) {
      return res.status(500).json({
        error: true,
        message: error.message,
      });
    }
  },

  async add(req, res) {
    try {
      const { id, account } = req.body;

      const user = await User.findById(id);

      if (!user) {
        return res.json({
          error: true,
          message: "User not found",
        });
      }

      const accountExists = await Accounts.find()
        .where("name")
        .in(account.name);

      if (accountExists.length) {
        return res.json({
          error: true,
          message: `Account ${account.name} already exists!`,
        });
      }

      await Accounts.create({
        userId: id,
        ...account,
      });

      user.accounts = accountExists;

      return res.status(201).json(user);
    } catch (error) {
      return res.status(500).json({
        error: true,
        message: error.message,
      });
    }
  },
  async removeAccount(req, res) {
    try {
      const { userId, id } = req.body;

      const user = await User.findById(userId);

      if (!user) {
        return res.json({
          error: true,
          message: "User not found",
        });
      }

      await Accounts.findByIdAndDelete(id);

      const accounts = await Accounts.find().where("userId").in(userId);

      user.accounts = accounts;

      return res.status(201).json(user);
    } catch (error) {
      return res.status(500).json({
        error: true,
        message: error.message,
      });
    }
  },
  async find(req, res) {
    try {
      const user = await User.findById(req.body.id).select("-password");

      if (!user) {
        return res.json({
          error: true,
          message: "User not found",
        });
      }

      const accounts = await Accounts.find().where("userId").in(req.body.id);

      user.accounts = accounts;

      return res.status(200).send(user);
    } catch (error) {
      return res.status(500).json({
        error: true,
        message: error.message,
      });
    }
  },

  async setAccount(req, res) {
    try {
      const { name, id } = req.body;

      const account = await Accounts.findOne({ name });
      if (!account) {
        return res.json({
          error: true,
          message: "Account not found",
        });
      }

      const user = await User.findByIdAndUpdate(id, {
        $set: {
          account,
        },
      });

      if (user.account.name === name) {
        return res.json({
          error: true,
          message: "Account is already in use",
        });
      }

      await user.save();

      const newUser = await User.findById(id);
      const accounts = await Accounts.find().where("userId").in(id);
      newUser.accounts = accounts;

      return res.status(200).json(newUser);
    } catch (error) {
      return res.status(500).json({
        error: true,
        message: error.message,
      });
    }
  },

  async exit(req, res) {
    try {
      const { id } = req.body;

      const user = await User.findByIdAndUpdate(id, {
        $set: {
          account: {
            name: null,
            appKey: null,
            appToken: null,
          },
        },
      });

      await user.save();

      const newUser = await User.findById(id);

      const accounts = await Accounts.find().where("userId").in(req.body.id);
      newUser.accounts = accounts;

      return res.status(200).json(newUser);
    } catch (error) {
      return res.status(500).json({
        error: true,
        message: error.message,
      });
    }
  },
};
