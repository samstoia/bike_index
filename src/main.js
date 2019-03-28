import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './styles.css';
import $ from 'jquery';

import BikeService from './../src/bike-index-es6.js';

$(document).ready(function(){
  $("#bike-form").submit(function(event){
    event.preventDefault();
    $('#bike-info').hide();
    $("#searching").show();

    let searchString = $('#searchInput').val();

    if (searchString != "") {
      searchString = "&query=" + searchString;
    }

    let bikeService = new BikeService();

    let promise = bikeService.getStolenBikes(searchString);

    promise.then(function(response) {
      $('#bike-info').empty();
      let body = JSON.parse(response);
      var table = $('#bike-info');

      table.append('<thead><tr><th>ID</th><th>Serial #</th><th>Manufacturer</th><th>Location: </th><th>Frame Model</th><th>Date Stolen:</th></tr></thead>');
      body.bikes.forEach(function(bike) {
        table.append('<tr><td><a href="https://bikeindex.org/bikes/' + bike.id + '">' + bike.id + '</a></td>' +
                         '<td>' + bike.serial + '</td>' +
                         '<td>' + bike.manufacturer_name + '</td>' +
                         '<td>' + bike.stolen_location + '</td>' +
                         '<td>' + bike.frame_model + '</td>' +
                         '<td>' + bikeService.convertDateStolen(bike.date_stolen) + '</td>' +
                      '</tr>');
      });
      $("#searching").hide();
      $("#bike-info").show();
    });
  });
});
