const routes = require("express").Router();
const userController = require("../api/controllers/userController");
const authController = require("../api/controllers/authController");
const auth = require("../api/middlewares/auth");

routes.get("/info", (req, res) => {
  return res.status(200).send({
    info: "ok",
    running: true,
  });
});

routes.post("/v1/user", userController.store);
routes.get("/v1/user", userController.find);
routes.post("/v1/login", authController.login);
routes.post("/v1/add", userController.add);
routes.delete("/v1/user/account", userController.removeAccount);
routes.post("/v1/set/account", userController.setAccount);
routes.post("/v1/exit/account", userController.exit);

module.exports = routes;
