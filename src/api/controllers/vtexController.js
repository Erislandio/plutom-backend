const User = require("../models/User");
const VtexClient = require("../../clients/vtexApi");

module.exports = {
  async databases(req, res) {
    const { id } = req.body;

    try {
      const user = await User.findById(id);

      if (!user) {
        return res.status(400).json({
          error: true,
          message: "User not found",
        });
      }

      if (
        !user.account.name ||
        !user.account.appKey ||
        !user.account.appToken
      ) {
        return res.json({
          error: true,
          message: `You need to set up an account first, use the command --login <account>`,
        });
      }

      const {
        account: { appKey, appToken, name },
      } = user;

      const vtexClient = new VtexClient(appKey, appToken, name);

      const response = await vtexClient.databases();

      return res.status(200).json(response);
    } catch (error) {
      return res.status(500).json({
        error: true,
        message: error.message,
      });
    }
  },
  async search(req, res) {
    const { id, acronym, fields, where } = req.body;

    try {
      const user = await User.findById(id);

      if (!user) {
        return res.json({
          error: true,
          message: "User not found",
        });
      }

      if (
        !user.account.name ||
        !user.account.appKey ||
        !user.account.appToken
      ) {
        return res.json({
          error: true,
          message: `You need to set up an account first, use the command --login <account>`,
        });
      }

      const {
        account: { appKey, appToken, name },
      } = user;

      const vtexClient = new VtexClient(appKey, appToken, name);

      const { data } = await vtexClient.search(acronym, fields, where);

      return res.status(200).json(data);
    } catch (error) {
      return res.status(500).json({
        error: true,
        message: error.message,
      });
    }
  },
  async desc(req, res) {
    const { id, acronym } = req.body;

    try {
      const user = await User.findById(id);

      if (!user) {
        return res.json({
          error: true,
          message: "User not found",
        });
      }

      if (
        !user.account.name ||
        !user.account.appKey ||
        !user.account.appToken
      ) {
        return res.json({
          error: true,
          message: `You need to set up an account first, use the command --login <account>`,
        });
      }

      const {
        account: { appKey, appToken, name },
      } = user;

      const vtexClient = new VtexClient(appKey, appToken, name);

      const { data } = await vtexClient.desc(acronym);

      return res.status(200).json(data.fields);
    } catch (error) {
      return res.status(500).json({
        error: true,
        message: error.message,
      });
    }
  },
};
