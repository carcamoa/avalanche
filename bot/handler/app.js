const api = require("lambda-api")();
const axios = require("axios")

let Page_Token = "EAALjqQVgQn0BACid2lfSWlRZAwDflxqbqP5aXZAdv4ifPZBaJ9lD1MUIDqecEEpwn4P2dbKhZAUGNHltF85URZBFUWY9tsQ1NylkH0FvrYBVZBJMLsjpPKlnR4DAcG4splnNFg7wf2Tukv987m20JL9HqcF9ZAhpdtSD2ZCQyZB9BDdlTXEZBAe6fD"
let Page_Id = "113926546918613"

function sendMessage(user,message)
{
    return axios({
        data: {
            "messaging_type": "RESPONSE",
            "recipient": {
            "id": user
            },
            "message": {
            "text": message
            }},
        method: 'post',
        url: `https://graph.facebook.com/v13.0/${Page_Id}/messages?access_token=${Page_Token}`
    }).then(d => {return d.data}).catch(d => {return d.response.data})
}

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

  let details = req.body.data.messaging[0]
  let user = details.sender.id
  let message = details.message.text

  let results = await sendMessage(user,message)

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