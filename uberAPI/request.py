import conf
from uber_rides.session import Session
from uber_rides.client import UberRidesClient

class Request:
    """ Request class"""
    def __init__(self, budget, ride_type, start_latitude, start_longitude, end_latitude, end_longitude, seat_count=1):
        """ Constructor for the Request """
        #config
        _conf = conf.local
        # param for estimate price 
        self.budget = budget
        self.ride_type = ride_type
        
        self.start_latitude = start_latitude
        self.start_longitude = start_longitude
        self.end_latitude = end_latitude
        self.end_longitude = end_longitude
        self.seat_count = seat_count
        
        #start the session here
        self.session = Session(server_token=_conf["Server Token"])
        self.client = UberRidesClient(self.session)
    
    def get_estimate_price(self):
        """returns estimate price for the request using uber API"""
        response = self.client.get_price_estimates(self.start_latitude, self.start_longitude, self.end_latitude, self.end_longitude, self.seat_count)
        prices = response.json.get('prices')
        # print(prices)
        for ride in prices:
            if ride["display_name"] == self.ride_type:
                return ride["estimate"] 

        return "Error"
    
    def get_budget(self):
        """ returns the budget"""
        return self.budget

    def set_budget(self, budget):
        """sets the new budget value for the object"""
        self.budget = budget
    
    def get_ride_type(self):
        """returns the ride type set"""
        return self.ride_type
    
    def set_ride_type(self, ride_type):
        """sets the new ride type value for the object"""
        self.ride_type = ride_type
    
    def get_start_location(self):
        """returns the start location"""
        return (self.start_latitude, self.start_longitude)
   
    def set_start_location(self, start_latitude, start_longitude):
        """sets the new start location"""
        self.start_latitude = start_latitude
        self.start_longitude = start_longitude
    
    def get_end_location(self):
        """returns the end location"""
        return (self.end_latitude, self.end_longitude)
    
    def set_end_location(self, end_latitude, end_longitude):
        """sets the new end location"""
        self.end_latitude = end_latitude
        self.end_longitude = end_longitude

    def get_seat_count(self):
        """returns the seat count"""
        return self.seat_count
    
    def set_seat_count(self, seat_count):
        """sets the new seat count value"""
        self.seat_count = seat_count

if __name__ == "__main__":
    req = Request(10,"UberX", 42.3601, -71.0589, 42.255459, -71.002579)
    print(req.get_budget())
    print(req.get_estimate_price())
    print(req.get_ride_type())
    