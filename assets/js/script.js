$(document).ready(function(){
    
   if (navigator.geolocation) {
  navigator.geolocation.getCurrentPosition(function(position) {
    var geocoder = new google.maps.Geocoder;
    var point = new google.maps.LatLng(
        position.coords.latitude, position.coords.longitude);
      var latit = new google.maps.LatLng(
      position.coords.latitude);
      var longit = new google.maps.LatLng(
      position.coords.longitude);
      console.log(longit + latit);
      
      $.ajax({
        url: "http://api.openweathermap.org/data/2.5/weather?lat=" + latitround + "&lon=" + longitround + "&APPID=bc3d3b235f99f62ce25579a6cc4975d0",
            success: function(response) {
            var temp = response.list[0].main.temp;
            console.log(temp);
    }
    });
      
    geocoder.geocode({'latLng': point}, function (locations, status) {
      if (status == google.maps.GeocoderStatus.OK) {
        for (var location of locations) {
          if ($.inArray('locality', location.types) != -1) {
            console.log('Your location is: ' + location.formatted_address);
              $('#location').text('You appear to be in ' + location.formatted_address);
            break;
          }
      }
    }
  });
  });
}
    function locError(error) {
      if (error.code == error.PERMISSION_DENIED) {
          console.log("Location permission denied");
          $('#locationPermission').css("display", "block");
      }
  }   

    $('#locContinueButton').click(function(){
        $('#locationPermission').css("display", "none");
    });
    
    $('#authContinueButton').click(function(){
        $('#googleAuthorize').css("display", "none");
    });
});