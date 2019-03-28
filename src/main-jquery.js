import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './styles.css';
import $ from 'jquery';

var BikeService = require('./../src/bike-index-jquery.js').bikeService;


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

    bikeService.getStolenBikes(searchString);

  });
});
