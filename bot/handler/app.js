const api = require("lambda-api")();
const functions = require("./functions")

//Necessary endpoint to verify webhook
api.get("/test", async (req, res) => {
  let VERIFY_TOKEN = "nosrac"
  let mode = req.query['hub.mode'];
  let token = req.query['hub.verify_token'];
  let challenge = req.query['hub.challenge'];
  if (mode && token) {
    if (mode === 'subscribe' && token === VERIFY_TOKEN) {
      res.status(200).send(challenge);
    } else {
      res.sendStatus(403);      
    }
  }
});

api.post("/test", async (req, res) => {

  let {user,message} = functions.parseWebhook(req)
  let results = await functions.sendMessage(user,message)

  if (results.message_id)
  {
    res.send({"user":user,"message":message})
  }
  else
  {
    res.send({"error":results})
  }

});

exports.lambdaHandler = async (event, context) => {
    let result = await api.run(event, context)
    console.log(result)
    return result;
};