$(document).ready(function() {

  $("#search").on("click", function() {
   var valueSearchBox = $('#getRestro').val()
   if (valueSearchBox === "") {
    return 0;
   }
   select();
  });
  //--------------------------------------------------SEARCH BY CITY-----------------------------------------
 
  function select() {
   var valueDropdown = $('#select_id').val();
   var valueSearchBox = $('#getRestro').val()
   var searchRestro = "&q=" + valueSearchBox;
   var settings = {
    "url": "https://developers.zomato.com/api/v2.1/search?entity_id=" + valueDropdown + "&entity_type=city" + searchRestro + "&count=100",
    "method": "GET",
    "headers": {
     "user-key": "00580b3953c06575b2b791025c9315fd",
     
    }
   }
   $.getJSON(settings, function(data) {
    console.log(data);
    data = data.restaurants;
    var html = "";
    $.each(data, function(index, value) {
     var x = data[index];
      console.log(typeof x);
     $.each(x, function(index, value) {
      var location = x.restaurant.location;
      var userRating = x.restaurant.user_rating;
      html += "<div class='data img-rounded'>";
      html += "<div class='rating'>";
      html += "<span title='" + userRating.rating_text + "'><p style='color:white;background-color:#" + userRating.rating_color + ";border-radius:4px;border:none;padding:2px 10px 2px 10px;text-align: center;text-decoration:none;display:inline-block;font-size:16px;float:right;'><strong>" + userRating.aggregate_rating + "</strong></p></span><br>";
      html += "  <strong class='text-info'>" + userRating.votes + " votes</strong>";
      html += "</div>";
      html += "<img class='resimg img-rounded' src=" + value.thumb + " alt='Restaurant Image' height='185' width='185'>";
      html += "<a href=" + value.url + " target='_blank' class='action_link'><h2 style='color:red;'><strong>" + value.name + "</strong></h2></a>";
      html += "  <strong class='text-primary'>" + location.locality + "</strong><br>";
      html += "  <h6 style='color:grey;'><strong>" + location.address + "</strong></h6><hr>";
      html += "  <strong>CUISINES</strong>: " + value.cuisines + "<br>";
      html += "  <strong>COST FOR TWO</strong>: " + value.currency + value.average_cost_for_two + "<br>";
      html += "</div><br>";
     });
    });
    $(".message").html(html);
   });
 
  }
  //--------------------------------------------------------------------------------------------------------
  $("#select_id").change(function() {
   select();
  });
 });
