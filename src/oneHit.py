from nasa import apod
from flask import Flask
from flask import jsonify
import datetime 
import random
import os

os.environ.setdefault(
    'NASA_API_KEY','WvED9gBGCfYhxDp0WcPb68VlPGvm12DqDW8RDDRS')

app = Flask(__name__)

@app.route('/apod/',methods=['GET'])
def getPic():
    print("TEST")
    badDates = ['2020-06-03','2020-08-25','2020-02-03','2020-07-13','2020-07-01']
    start_date = datetime.date(2020, 1, 1)
    end_date = datetime.date(2020, 12, 31)
    random_date = '2020-06-03'
    while(random_date in badDates):
        time_between_dates = end_date - start_date
        days_between_dates = time_between_dates.days
        random_number_of_days = random.randrange(days_between_dates)
        random_date = start_date + datetime.timedelta(days=random_number_of_days)

    print(random_date)

    picture = apod.apod(str(random_date))
    print(picture.url)
    return {"apod":picture.url}

if __name__ == "__main__":
   app.run(debug=True, host="127.0.0.1", port=28990)