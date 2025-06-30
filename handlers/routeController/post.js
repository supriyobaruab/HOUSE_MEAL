const mongoose = require("mongoose");
const people = require("../../schema/peopleSchema");

async function post(req, res) {
  const { name, today } = req.body;
  console.log(name, today);
  const todayDate = new Date().toISOString().split("T")[0];

  const latest = await people.findOne({ name }).sort({ _id: -1 });

  if (latest && latest.lastDate === todayDate && latest.submittedToday) {
    return res.status(400).json({ error: "Already submitted today." });
  }

  const total = (latest?.total || 0) + today;

  const newEntry = new people({
    name,
    total,
    today,
    lastDate: todayDate,
    submittedToday: true,
  });

  await newEntry.save();

  res.json({ message: "Success", total });
}

module.exports = post;
