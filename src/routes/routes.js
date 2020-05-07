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

routes.post("/user", userController.store);
routes.post("/login", authController.login);

module.exports = routes;
