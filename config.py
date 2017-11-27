# Twitter Credentials
#
# To obtain the credentials, you must first have a Twitter account. 
# Then, go to https://dev.twitter.com/, login, and click on "Manage Your Apps" to reach https://apps.twitter.com/.
# Then, click "Create New App", fill in the relevant fields, and click "Create your Twitter application".
# With the application created, navigate to the API Keys page and click "Create my access token". 
# You now have the four necessary credentials. Copy the API key, API secret, 
# Access token, and Access token secret here.
# NOTE: API key and API secret go in the twitter_consumer_key and twitter_consumer_secret vars.
#

twitter_consumer_key = 'ngRMEDdi19pp8yarMCWiW1pDM'
twitter_consumer_secret = '4vM6rb1EnI3QGmeXrOSiOACvAIc2RjK7ZRu2upwICRi5oykH4F'
twitter_access_token = '756416902570778624-ktapJy7zu1iwf0MzJYTqlGAnzbjgoVN'
twitter_access_secret = 'DogvoAzxN8kBH7MZdmEimUf68aMinyqIBJOLFIzPHnPrE'

# Personality Insights credentials and URL
#
# You can obtain these credentials by binding a PI service to an application in bluemix and 
# and clicking the "show credentials" link on the service in the application dashboard.
# Or you can use "cf env <application name>" from the command line to get the credentials.

pi_url = "https://gateway.watsonplatform.net/personality-insights/api"
pi_username = "01f9b027-2c40-421e-b2b4-c66ae2c85555"
pi_password = "BSkQpaytj38l"