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
            // console.log(result)
            $("#poolrate").text(poolrate);
            $("#xrate").text(xrate);
            $("#xlrate").text(xlrate);
          }
      });
      document.getElementById("rateTable").style.display = "block";
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