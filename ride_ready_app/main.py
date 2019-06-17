from flask import Flask, render_template, request, jsonify
import requests, sys, json
# sys.path.insert(0, os.getcwd()+"/uberAPI")
# import uberAPI.uber_request as ur
# sys.path.append("/test_flask/")
import uberapi.uber_request as ur
app = Flask(__name__)

@app.route('/')
def index():
    return render_template('estimate.html')



@app.route('/postText', methods=['POST'])
def live_rate():
    # receive JSON
    req = request.json
    # Geocodes
    start_lat = req["start_lat"]
    start_long = req["start_long"]
    dest_lat = req["dest_lat"]
    dest_long = req["dest_long"]

    budget = req["budget"]
    ride_type = req["ridetype"]
    seat_count = req["seatcount"]

    # Create rede request class here
    ride_request = ur.UberRequest(budget,start_lat,start_long,dest_lat,dest_long,seat_count)

    ride_rates = ride_request.get_estimate_price()
    
    # Initiate returning data
    return_data = {}

    # iterate to find uber rates here
    for rate in ride_rates:
        # add pool, x, xl in json
        if rate["display_name"] in ("UberPool", "UberX", "UberXL"):
            return_data[rate["display_name"]]  = rate["display_name"] + ":\t" +str(rate["high_estimate"])
        # set the cost to compare against budget in liveRate
        if rate["display_name"] == ride_type:
            return_data["cost"] = rate["high_estimate"]
        
    # return_data = {
    #     "start_lat":ride_request.start_lat,"start_long":start_long,
    #     "dest_lat":dest_lat,"dest_long":dest_long, 
    #     "budget":budget, "ridetype":ride_type, "seatcount":seat_count}
    # return jsonify(ResultSet=json.dumps(return_data))
    return jsonify(ResultSet=json.dumps(return_data))
    

# MAIN BELOW RUNS APP
if __name__ == '__main__':
    app.run(debug = True, port=8080)
