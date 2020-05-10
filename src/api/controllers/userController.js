const User = require("../models/User.js");
const Accounts = require("../models/Accounts");

module.exports = {
  async store(req, res) {
    try {
      const { email, password } = req.body;

      const user = await User.findOne({ email });

      if (user) {
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

      const accounts = await Accounts.find().where("userId").in(id);

      const findAccount = accounts.filter((item) => item.name === account.name);

      if (findAccount.length) {
        return res.json({
          error: true,
          message: `Account ${account.name} already exists!`,
        });
      }

      await Accounts.create({
        userId: id,
        ...account,
      });

      user.accounts = accounts;

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
      const { id, accountId } = req.body;

      const user = await User.findById(id);

      if (!user) {
        return res.json({
          error: true,
          message: "User not found",
        });
      }

      await Accounts.findByIdAndDelete(accountId);

      const accounts = await Accounts.find().where("userId").in(id);
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
      const { id } = req.query;

      const user = await User.findById(id);

      if (!user) {
        return res.json({
          error: true,
          message: "User not found",
        });
      }

      const accounts = await Accounts.find().where("userId").in(id);
      user.password = null;
      user.accounts = accounts;

      return res.status(200).json(user);
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

      const accounts = await Accounts.find().where("userId").in(id);
      if (!accounts.length) {
        return res.json({
          error: true,
          message: "Account not registred",
        });
      }

      const account = accounts.find((item) => item.name === name);

      if (!account) {
        return res.json({
          error: true,
          message: "Account not found",
        });
      }

      const user = await User.findById(id);

      if (user.account && user.account.name === name) {
        return res.json({
          error: true,
          message:
            "Account is already in use, try using another account with the --use command",
        });
      }

      User.findByIdAndUpdate(
        id,
        {
          account,
        },
        { new: false }
      )
        .then((data) => {
          return res.status(201).json(data);
        })
        .catch((error) => {
          return res.status(500).json({
            error: true,
            message: error.message,
          });
        });

      return res.status(200).json(user);
    } catch (error) {
      return res.status(500).json({
        error: true,
        message: error.message,
      });
    }
  },

  async getAccounts(req, res) {
    try {
      const { id } = req.query;

      const user = await User.findById(id);

      if (!user) {
        return res.json({
          error: true,
          message: "User not found",
        });
      }

      const accounts = await Accounts.find().where("userId").in(id);

      return res.status(200).json(accounts);
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

      const user = await User.findById(id);

      if (!user) {
        return res.json({
          error: true,
          message: "User not found",
        });
      }

      await user.updateOne({
        $set: {
          account: {
            name: null,
            appKey: null,
            appToken: null,
          },
        },
      });

      const newUser = await User.findById(id);

      return res.status(200).json(newUser);
    } catch (error) {
      return res.status(500).json({
        error: true,
        message: error.message,
      });
    }
  },
};
