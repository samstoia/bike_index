import $ from 'jquery';

var BikeService = function() {

}

BikeService.prototype.getStolenBikes = function(searchString) {
  var url = "https://bikeindex.org:443/api/v3/search?page=1&per_page=25" + searchString;

  $.get(url)
  .then(function(response) {
      $('#bike-info').empty();
      console.log(response);
      var body = response;
      var table = $('#bike-info');

      table.append('<thead><tr><th>ID</th><th>Serial #</th><th>Manufacturer</th><th>Location: </th><th>Frame Model</th><th>Date Stolen:</th></tr></thead>');
      body.bikes.forEach(function(bike) {
        table.append('<tr><td><a href="https://bikeindex.org/bikes/' + bike.id + '">' + bike.id + '</a></td>' +
                         '<td>' + bike.serial + '</td>' +
                         '<td>' + bike.manufacturer_name + '</td>' +
                         '<td>' + bike.stolen_location + '</td>' +
                         '<td>' + bike.frame_model + '</td>' +
                         '<td>' + convertDateStolen(bike.date_stolen) + '</td>' +
                         '</tr>');
      });
      $("#searching").hide();
      $("#bike-info").show();
    })
    .fail(function() {
      console.log("something went wrong");
    });
}

var convertDateStolen = function(stolenDate) {
  var date = new Date(stolenDate * 1000);
  if (date.getMonth() < 10) {
    return date.getFullYear() + "-0" + date.getMonth() + "-" + date.getDate();
  } else {
    return date.getFullYear() + "-" + date.getMonth() + "-" + date.getDate();
  }
}

exports.bikeService = BikeService;
