import requests

#Visit here to get a user access token for the app: https://developers.facebook.com/tools/explorer/

user_access_token = "EAALjqQVgQn0BAABZADxTwJtFRRNfHoZBkweBzq25ZCJm0hsxIuQGZAN2noWWjFVqwyZAuJZCUqxpJgu47d7STHjyiXCepgTSeKJBtBcZC5HcOtPgnd0Ne6RZBgwWsQZCOrcZBCh3BLzUQE2BuJiL4G0ukJeSffYTXqWx4uNochQ46Qoj8ZBCzQB3OdY7GZCmYrb6aV1qWzz1K5gI6wZDZD"
app_id = "813265032594045"
app_secret = "390c489bd10cb1c7cc5f21d45af3073a"
page_id = "113926546918613"

response = requests.get("https://graph.facebook.com/oauth/access_token?grant_type=fb_exchange_token&client_id={}&client_secret={}&fb_exchange_token={}".format(app_id,app_secret,user_access_token))

long_lived_user_access_token = response.json()['access_token']

response = requests.get("https://graph.facebook.com/{}?fields=access_token&access_token={}".format(page_id,long_lived_user_access_token))

print(response.json()['access_token'])