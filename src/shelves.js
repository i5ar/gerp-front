import {HttpClient, json} from 'aurelia-fetch-client';

let httpClient = new HttpClient();

export class Shelves {

  // configureRouter(config, router) {
  //   this.router = router;
  //   // this.att = config.options.pushState=true;
  //   config.map([
  //     {route: '2', moduleId: 'shelf', name: 'shelf', nav: true, title: '2'}
  //   ]);
  // }

  constructor() {
    this.header = 'Binders';

    this.getShelves = () => {
      httpClient.fetch('http://127.0.0.1:8000/en/api/shelves/shelves/')
      .then(response => response.json())
      .then(data => {
        console.log(data);
        this.shelves = data;
      });
    };
  }

  name = '';
  cols;
  rows;
  nums;
  /**
   * Post shelf.
   * {@link http://aurelia.io/hub.html#/doc/article/aurelia/fetch-client/latest/http-services/}
   */
  postShelf() {
    let shelf = {
      name: this.name,
      cols: this.cols,
      rows: this.rows,
      nums: this.nums
    };
    httpClient.fetch('http://127.0.0.1:8000/en/api/shelves/shelves/', {
      method: 'post',
      body: json(shelf)
    })
    .then(response => response.json())
    .then(data => {
      console.log(data);
      alert(`Shelf saved! ${data}`);
      // Since the data is saved we add to the page.
      this.getShelves();
    })
    .catch(error => {
      alert('Shelf error!');
    });
  }

  /**
   * Get shelves on activate or attached?
   */
  attached() {
    this.getShelves();
  }

}
