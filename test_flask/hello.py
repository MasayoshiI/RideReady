from flask import Flask, render_template, request
import requests
app = Flask(__name__)

@app.route('/')
def index():
    return render_template('estimate.html')



# def get_geocode(address):
#     google_api_key = ""
#     address = address.split()
#     address = '+'.join(address)
#     response = requests.get("https://maps.googleapis.com/maps/api/geocode/json?address=" + address +"&key=" + google_api_key)
#     resp_json_payload = response.json()

#     return resp_json_payload["results"][0]["geometry"]["location"]


# MAIN BELOW RUNS APP
if __name__ == '__main__':
   app.run(debug = True, port=8080)
