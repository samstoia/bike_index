import $ from 'jquery';

export default class BikeService {

  getStolenBikes(searchString, displayData) {
    let url = "https://bikeindex.org:443/api/v3/search?page=1&per_page=25" + searchString;
    $.ajax({
      url: url,
      type: 'GET',
      data: {
        format: 'json'
      },
      success: function(response) {
        displayData(response);
      },
      error: function() {
        console.log("something went wrong");
      }
    });
  }
}
