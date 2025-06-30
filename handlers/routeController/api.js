const people = require("../../schema/peopleSchema");
const contribution = require("../../schema/contributionSchema");

async function api(req, res) {
  try {
    const names = ["supriyo", "debongshi", "waly", "mahmud"];
    const peopleResults = [];
    const contributionResults = [];

    const todayDate = new Date().toISOString().split("T")[0];

    for (const name of names) {
      const latestPerson = await people.findOne({ name }).sort({ _id: -1 });
      if (latestPerson) {
        let lastDateFormatted = "";
        if (latestPerson.lastDate) {
          const d = new Date(latestPerson.lastDate);
          lastDateFormatted = d.toISOString().split("T")[0];
        }

        if (lastDateFormatted !== todayDate) {
          latestPerson.today = 0;
          latestPerson.submittedToday = false;
          latestPerson.lastDate = todayDate;
        }

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
