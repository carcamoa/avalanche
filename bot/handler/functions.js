const axios = require("axios")

let Page_Token = "EAALjqQVgQn0BAF5tJvenJvp3XqDXuGaZCyocLp72WKef3Mc89HOILpQEyV9O9S7YoWhwwUMzZB4frCDuMwuevZBq6tmOtyBlSKdWYX50lbZClwcapRlyZAtmXsHcAe041WLNYlvNcWhFashNqphsBvC7FObaZAPtboXyYA7oxoZBJgfu76dxaXV"
let Page_Id = "110391118251071"

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