const mongoose = require("mongoose");
const contribution = require("../../schema/contributionSchema");

async function Cpost(req, res) {
  try {
    const { name, result } = req.body;

    const created = await contribution.create({
      name,
      result,
    });

    console.log("Created:", created);
    res.json(created);
  } catch (error) {
    console.error("Error saving to DB:", error.message);
    res.status(500).send(error.message);
  }
}

module.exports = Cpost;
