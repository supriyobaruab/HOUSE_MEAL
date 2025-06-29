const people = require("../../schema/peopleSchema");
const contribution = require("../../schema/contributionSchema");

async function api(req, res) {
  try {
    const names = ["supriyo", "debongshi", "waly", "mahmud"];
    const peopleResults = [];
    const contributionResults = [];

    for (const name of names) {
      const latestPerson = await people.findOne({ name }).sort({ _id: -1 });
      if (latestPerson) {
        peopleResults.push(latestPerson);
      }

      const latestContribution = await contribution
        .findOne({ name })
        .sort({ _id: -1 });
      if (latestContribution) {
        contributionResults.push(latestContribution);
      }
    }

    res.json({
      people: peopleResults,
      contributions: contributionResults,
    });
  } catch (error) {
    res.status(500).send(error.message);
  }
}

module.exports = api;
