from flask import Flask, render_template, request, jsonify
import requests, sys
app = Flask(__name__)

@app.route('/')
def index():
    return render_template('estimate.html')


@app.route("/function_route", methods=["GET", "POST"])
def estimate():
    
    if request.method == "POST":
        geolocation = {}    # empty dict to store data
        geolocation['lat'] = request.json['lat']
        geolocation['lng'] = request.json['lng']

        # do whatever you want with the data here e.g look up in database or something
        # if you want to print to console

        print(geolocation, file=sys.stderr)

        # then return something back to frontend on success
        # this returns back received data and you should see it in browser console
        # because of the console.log() in the script.

        return jsonify(geolocation)
    
    else:
        return render_template('estimate.html')


# MAIN BELOW RUNS APP
if __name__ == '__main__':
   app.run(debug = True, port=8080)
