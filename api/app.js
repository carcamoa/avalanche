const api = require("lambda-api")();
const functions = require("./functions")

api.get("/:id", async (req, res) => {

  let result = await functions.getObject(`${req.params.id}.json`)
  res.send(result)

});

exports.lambdaHandler = async (event, context) => {
    let result = await api.run(event, context)
    console.log(result)
    return result;
};