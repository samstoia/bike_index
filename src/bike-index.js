export default class BikeService {

  getStolenBikes(searchString) {
    let url = "https://bikeindex.org:443/api/v3/search?page=1&per_page=25" + searchString;

    return new Promise(function(resolve, reject) {
      let request = new XMLHttpRequest();

      request.onload = function() {
        if (this.status === 200) {
          resolve(request.response);

        } else {
          reject(Error(request.statusText));
        }
      }
      request.open("GET", url, true);
      request.send();
    });
  }

  convertDateStolen(stolenDate) {
    let date = new Date(stolenDate * 1000);
    if (date.getMonth() < 10) {
      return date.getFullYear() + "-0" + date.getMonth() + "-" + date.getDate();
    } else {
      return date.getFullYear() + "-" + date.getMonth() + "-" + date.getDate();
    }
  }
}
