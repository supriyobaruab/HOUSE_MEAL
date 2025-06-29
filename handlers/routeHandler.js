const express = require("express");
const router = express.Router();
const get = require("./routeController/get");
const post = require("./routeController/post");
const api = require("./routeController/api");
const Cpost = require("./routeController/Cpost");

router.get("/", get);
router.get("/api", api);
router.post("/submit", post);
router.post("/contribute", Cpost);

module.exports = router;
