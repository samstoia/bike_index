import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './styles.css';
import $ from 'jquery';

import BikeService from './../src/bike-index-ajax.js';

let displayData = (response) => {
  let convertDateStolen = (stolenDate) => {
    let date = new Date(stolenDate * 1000);
    if (date.getMonth() < 10) {
      return date.getFullYear() + "-0" + date.getMonth() + "-" + date.getDate();
    } else {
      return date.getFullYear() + "-" + date.getMonth() + "-" + date.getDate();
    }
  }

  $('#bike-info').empty();
  let body = response;
  let table = $('#bike-info');

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
}

$(document).ready(function(){

  var bikeService = new BikeService();

  $("#bike-form").submit(function(event){
    event.preventDefault();
    $('#bike-info').hide();
    $("#searching").show();
    
    var searchString = $("#searchInput").val();

    if (searchString != "") {
      searchString = "&query=" + searchString;
    }

    bikeService.getStolenBikes(searchString, displayData);

  });
});
