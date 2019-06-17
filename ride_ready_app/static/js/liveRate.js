// This function gets called by sendRequest on gmail.js when there is no error in the format of the request
function liveRate(geocode,budget,ridetype,seatcount) {
    // console.log("live rate func")
    // console.log(geocode)
    // console.log(Array.isArray(geocode))
    // console.log(geocode[0][0])
    // console.log(geocode[0][1])
    // console.log(geocode[1][0])
    // console.log(geocode[1][1])
    
    var rideRequest = JSON.stringify({
        "start_lat":geocode[0][0],"start_long":geocode[0][1],
        "dest_lat":geocode[1][0],"dest_long":geocode[1][1],
        "budget":budget,"ridetype":ridetype,"seatcount":seatcount
    });
    console.log(ridetype);
    $.ajax({
        type:'POST',
        url:'/postText',
        data:rideRequest,
        contentType:'application/json',
        success:function(data) {
            result = JSON.parse(data.ResultSet)
            var poolrate = result.UberPool;
            var xrate = result.UberX;
            var xlrate = result.UberXL;
            var cost = result.cost;
            // console.log(result)
            $("#poolrate").text(poolrate);
            $("#xrate").text(xrate);
            $("#xlrate").text(xlrate);
            console.log(result)
            
            console.log(cost);
            // budget is over the cost — ride is ready
            if(budget >= cost) {
                // console.log("cost under budget")
                console.log(isCompleted);
                isCompleted = true;
                console.log(isCompleted);
                alert("The fare is under the budget!");
                stopLiveTable()
            }
            // if the budget is too low
            if(budget < (cost * 0.6)) {
                requireNewBudget = true;
                alert("The given budget is less than 60% of the estimate cost, try again with the new budget!");
                stopLiveTable()
            }
          }
      });
      document.getElementById("rateTable").style.display = "block";
      
      
    // Repeat liveRate function 30 sec each
    //   setTimeout(liveRate(geocode,budget,ridetype,seatcount), 30000);

    // var textData = JSON.stringify({
    //     "pool":"Pool Rate","x":"X Rate","xl":"XL Rate"
    // });
    // $.ajax({
    //     type:'POST',
    //     url:'/postText',
    //     data:textData,
    //     contentType:'application/json',
    //     success:function(data) {
    //         result = JSON.parse(data.ResultSet)
    //         var pool = result.pool;
    //         var x = result.x;
    //         var xl = result.xl;
    //         // console.log(result)
    //         $("#poolrate").text(pool);
    //         $("#xrate").text(x);
    //         $("#xlrate").text(xl);
    //       }
    //   });
    return false;
}