async function get(req, res) {
  try {
    res.render("index");
  } catch (error) {
    res.send(error.message);
  }
}
module.exports = get;
