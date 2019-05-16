$(document).ready(function(){

    // Insta format change
    var instaChangeformat = function() {
      if ($(window).width() <= 768) {
              $('#mobileInsta').show();
                $('#pcInsta').hide();
              } 
            else if ($(window).width() > 768) {
              $('#pcInsta').show();
              $('#mobileInsta').hide();
              };
    }
    // Call when window is resized
    $(window).resize(function(){
      instaChangeformat();
    });
    //Call it when the page first loads:
    instaChangeformat();
    
});