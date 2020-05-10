const routes = require("express").Router();
const userController = require("../api/controllers/userController");
const authController = require("../api/controllers/authController");
const auth = require("../api/middlewares/auth");
const vtexController = require("../api/controllers/vtexController");

routes.get("/info", (req, res) => {
  return res.status(200).send({
    info: "ok",
    running: true,
  });
});

routes.post("/v1/user", userController.store);
routes.get("/v1/user", auth, userController.find);
routes.post("/v1/login", authController.login);
routes.post("/v1/add", auth,userController.add);
routes.delete("/v1/user/account", auth, userController.removeAccount);
routes.get("/v1/user/account", auth, userController.getAccounts);
routes.post("/v1/set/account", auth, userController.setAccount);
routes.post("/v1/exit/account", auth, userController.exit);
routes.post("/v1/search/databases", auth, vtexController.databases);
routes.post("/v1/search", auth, vtexController.search);
routes.post("/v1/desc", auth, vtexController.desc);

module.exports = routes;
