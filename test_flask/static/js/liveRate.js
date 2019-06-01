
    document.getElementById('submit').addEventListener('click', function() {
        liveRate();
        console.log("aaa")
      });




function liveRate(){
    console.log("aaa")
    var textData = JSON.stringify({
        "pool":"Pool Test","x":"x Test","xl":"xl Test"
    });
    $.ajax({
        type:'POST',
        url:'/postText',
        data:textData,
        contentType:'application/json',
        success:function(data) {
            result = JSON.parse(data.ResultSet)
            var pool = result.pool;
            var x = result.x;
            var xl = result.xl;
            // console.log(result)
            $("#poolrate").text(pool);
            $("#xrate").text(x);
            $("#xlrate").text(xl);
          }
      });
      return false;
}