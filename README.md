# Ride Ready

Ride Ready is the web app that notifies users when the uber ride is under the set budget. User needs to let RideReady know the starting location, destination, budget and ridetype (seat count if it is uber pool), and the app will show live time table of prices for uber pool, uber x and uber xl. Once the set ridetype's fee is under budget it will pop up the notification.

## Getting Started

Start installing Prerequisite and make a developer account for uber here (https://developer.uber.com/)

Create conf.py at "ride_ready_app/uberapi/___"

Inside of conf.py:
local = {
"CLIENT_ID": "YOUR CLIENT ID",
"Server_Token": "YOUR SERVER TOKEN",
"REDIRECT_URI":"YOUR REDIRECT URI",
"SCOPES": "YOUR SCOPES",
}


### Prerequisites

Python 3.6
flask
uberapi
uberapi secret key and client id

## Deployment

Currently working on it to add on heroku server.


## Versioning
Version 1.0.0

## Author

* **Masayoshi Iwasa** - *Founder/Developer* - [MasayoshiI](https://github.com/MasayoshiI)

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details
