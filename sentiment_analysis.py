import re
import tweepy
from tweepy import OAuthHandler
from textblob import TextBlob
from flask import Flask, request, jsonify
import json
from ibm_analyze import ibm_analyze

app = Flask(__name__)

@app.route("/")
def analyze_tweets():
    search_query = request.args.get('handle', '')

    # creating object of TwitterClient Class
    api = TwitterClient()
    # calling function to get tweets
    tweets = api.get_tweets(query = search_query, count = 200)

    # picking positive tweets from tweets
    ptweets = [tweet for tweet in tweets if tweet['sentiment'] == 'positive']


    # percentage of positive tweets
    # print("Positive tweets percentage: {} %".format(100*len(ptweets)/len(tweets)))
    # picking negative tweets from tweets
    ntweets = [tweet for tweet in tweets if tweet['sentiment'] == 'negative']
    # percentage of negative tweets
    # print("Negative tweets percentage: {} %".format(100*len(ntweets)/len(tweets)))
    # percentage of neutral tweets
    # print("Neutral tweets percentage: {} %".format(100*(len(tweets) - len(ntweets) - len(ptweets))/len(tweets)))

    data = {}
    # data['pos_tweets_percent'] = 100*len(ptweets)/len(tweets)
    # data['neg_tweets_percent'] = 100*len(ntweets)/len(tweets)
    # data['neu_tweets_percent'] = 100*(len(tweets) - len(ntweets) - len(ptweets))/len(tweets)
    #
    # data['pos_tweets'] = []
    # data['neg_tweets'] = []
    # # printing first 5 positive tweets
    # # print("\n\nPositive tweets:")
    # for tweet in ptweets[:10]:
    #     data['pos_tweets'].append(tweet['text'])
    #     # print(tweet['text'])
    #
    # # printing first 5 negative tweets
    # # print("\n\nNegative tweets:")
    # for tweet in ntweets[:10]:
    #     data['neg_tweets'].append(tweet['text'])
    #     # print(tweet['text'])

    ibm_analysis = ibm_analyze(search_query)
    data.update(ibm_analysis)
    # json_data = json.dumps(data)
    return jsonify(**data)

class TwitterClient(object):
    '''
    Generic Twitter Class for sentiment analysis.
    '''
    def __init__(self):
        '''
        Class constructor or initialization method.
        '''
        # keys and tokens from the Twitter Dev Console
        consumer_key = 'ngRMEDdi19pp8yarMCWiW1pDM'
        consumer_secret = '4vM6rb1EnI3QGmeXrOSiOACvAIc2RjK7ZRu2upwICRi5oykH4F'
        access_token = '756416902570778624-ktapJy7zu1iwf0MzJYTqlGAnzbjgoVN'
        access_token_secret = 'DogvoAzxN8kBH7MZdmEimUf68aMinyqIBJOLFIzPHnPrE'

        # attempt authentication
        try:
            # create OAuthHandler object
            self.auth = OAuthHandler(consumer_key, consumer_secret)
            # set access token and secret
            self.auth.set_access_token(access_token, access_token_secret)
            # create tweepy API object to fetch tweets
            self.api = tweepy.API(self.auth)
        except:
            print("Error: Authentication Failed")

    def clean_tweet(self, tweet):
        '''
        Utility function to clean tweet text by removing links, special characters
        using simple regex statements.
        '''
        return ' '.join(re.sub("(@[A-Za-z0-9]+)|([^0-9A-Za-z \t])|(\w+:\/\/\S+)", " ", tweet).split())

    def get_tweet_sentiment(self, tweet):
        '''
        Utility function to classify sentiment of passed tweet
        using textblob's sentiment method
        '''
        # create TextBlob object of passed tweet text
        analysis = TextBlob(self.clean_tweet(tweet))
        # set sentiment
        if analysis.sentiment.polarity > 0:
            return 'positive'
        elif analysis.sentiment.polarity == 0:
            return 'neutral'
        else:
            return 'negative'

    def get_tweets(self, query, count = 10):
        '''
        Main function to fetch tweets and parse them.
        '''
        # empty list to store parsed tweets
        tweets = []

        try:
            # call twitter api to fetch tweets
            fetched_tweets = self.api.search(q = query, count = count)

            # parsing tweets one by one
            for tweet in fetched_tweets:
                # empty dictionary to store required params of a tweet
                parsed_tweet = {}

                # saving text of tweet
                parsed_tweet['text'] = tweet.text
                # saving sentiment of tweet
                parsed_tweet['sentiment'] = self.get_tweet_sentiment(tweet.text)

                # appending parsed tweet to tweets list
                if tweet.retweet_count > 0:
                    # if tweet has retweets, ensure that it is appended only once
                    if parsed_tweet not in tweets:
                        tweets.append(parsed_tweet)
                else:
                    tweets.append(parsed_tweet)

            # return parsed tweets
            return tweets

        except tweepy.TweepError as e:
            # print error (if any)
            print("Error : " + str(e))

def main():
    # creating object of TwitterClient Class
    api = TwitterClient()
    # calling function to get tweets
    tweets = api.get_tweets(query = '@realdonaldtrump', count = 200)

    # picking positive tweets from tweets
    ptweets = [tweet for tweet in tweets if tweet['sentiment'] == 'positive']
    # percentage of positive tweets
    print("Positive tweets percentage: {} %".format(100*len(ptweets)/len(tweets)))
    # picking negative tweets from tweets
    ntweets = [tweet for tweet in tweets if tweet['sentiment'] == 'negative']
    # percentage of negative tweets
    print("Negative tweets percentage: {} %".format(100*len(ntweets)/len(tweets)))
    # percentage of neutral tweets
    print("Neutral tweets percentage: {} %".format(100*(len(tweets) - len(ntweets) - len(ptweets))/len(tweets)))

    # printing first 5 positive tweets
    print("\n\nPositive tweets:")
    for tweet in ptweets[:10]:
        print(tweet['text'])

    # printing first 5 negative tweets
    print("\n\nNegative tweets:")
    for tweet in ntweets[:10]:
        print(tweet['text'])

if __name__ == "__main__":
    app.run(host= '0.0.0.0', debug=True, port=8000)
