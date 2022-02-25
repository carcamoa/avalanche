const axios = require("axios")

let Page_Token = "EAALjqQVgQn0BAE8dqn1wxUVAAYReRpXbL8SVU396n7ouJ0AZBLx5ehiP2uujhiC8mdi9NjvoM7etSQBxvWuAXHEjZCtM8D6vufA4zKiAsbpj8IV9P0azOXghulii4mG8pBYdkUqvyaErTM08rco0AZAnRaTWHGShF64xwzgYAZB9kWZASRtns"
let Page_Id = "113926546918613"

function parseWebhook(req)
{
  let details = req.body.entry[0].messaging[0]
  let user = details.sender.id
  let message = details.message.text
  return {"user":user,"message":message}
}

exports.parseWebhook = parseWebhook;

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

exports.sendMessage = sendMessage