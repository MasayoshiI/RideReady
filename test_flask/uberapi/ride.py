import conf
from uber_request import UberRequest
from uber_rides.session import Session
from uber_rides.client import UberRidesClient

class Ride(UberRequest):
    """ride class finds/cancels ride bades on the request class"""
    def __init__(self, budget, ride_type, start_latitude, start_longitude, end_latitude, end_longitude, seat_count):
        UberRequest.__init__(self, budget, ride_type, start_latitude, start_longitude, end_latitude, end_longitude, seat_count)
        self.readiness = self.is_ride_ready()
        self.ordered = False

    def is_ride_ready(self):
        """returns true if the price is under the budget"""
        return self.budget > self.get_estimate_price()
    
    def register_ride(self):
        """registers a ride using the req information"""
        # Get products for a location
        response = self.client.get_products(self.start_latitude, self.start_longitude)
        products = response.json.get('products')
        product_id = products[0].get('product_id')

        # Get upfront fare and start/end locations
        estimate = self.client.estimate_ride(
            product_id, 
            self.start_latitude,
            self.start_longitude,
            self.end_latitude,
            self.end_longitude,
            self.seat_count
        )
        fare = estimate.json.get('fare')

        # Request a ride with upfront fare and start/end locations
        response = self.client.request_ride(
            product_id,
            self.start_latitude,
            self.start_longitude,
            self.end_latitude,
            self.end_longitude,
            self.seat_count,
            fare_id=fare['fare_id']
        )

        request = response.json
        request_id = request.get('request_id')

        # Request ride details using `request_id`
        response = self.client.get_ride_details(request_id)
        ride = response.json

        

    def cancel_ride(self):
        """cancels a ride if there is any"""
        # Cancel a ride
        # response = self.client.cancel_ride(request_id)
        # ride = response.json
        pass
if __name__ == "__main__":
    req = UberRequest(10,"UberX", 42.3601, -71.0589, 42.255459, -71.002579)
    print(req.get_budget())
    print(req.get_estimate_price())
    # print(req.get_ride_type())
    # ride = Ride(req)
    