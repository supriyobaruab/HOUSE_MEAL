const express = require("express");
const router = express.Router();
const schema = require("../schema/schema");
const contribution = require("../schema/contribution");
//Imported controllers
router.get("/", (req, res) => {
  res.render("index");
});
router.get("/info", async (req, res) => {
  const data = await schema.find();
  res.json({ data });
});
router.post("/info", async (req, res) => {
  const info = new schema({
    name: req.body.name,
    total_count: req.body.total_count,
    date: req.body.date,
  });
  await info.save();
  res.json({ message: info });
});
router.put("/info", async (req, res) => {
  console.log(req.body.name);
  const { name, total_count, date } = req.body;
  const info = await schema.updateOne(
    { name },
    { $set: { total_count, date } }
  );
  res.json({ message: info });
});
router.post("/contribute", async (req, res) => {
  const { name, amount } = req.body;
  const tk = new contribution({ name, amount });
  await tk.save();
});
router.get("/contribute", async (req, res) => {
  const result1 = await contribution
    .findOne({ name: "supriyo" })
    .sort({ _id: -1 });
  const result2 = await contribution
    .findOne({ name: "debongshi" })
    .sort({ _id: -1 });
  const result3 = await contribution
    .findOne({ name: "waly" })
    .sort({ _id: -1 });
  const result4 = await contribution
    .findOne({ name: "mahmud" })
    .sort({ _id: -1 });
  const infoArray = [result1, result2, result3, result4];
  res.json({ Result: infoArray });
});
router.get("/calculate", (req, res) => {
  res.render("calculate");
});
router.get("/logs", (req, res) => {
  res.render("");
});
module.exports = router;
