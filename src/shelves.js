import {HttpClient, json} from 'aurelia-fetch-client';
import {inject} from 'aurelia-framework';
import {State} from 'state';

let httpClient = new HttpClient();

@inject(State)
export class Shelves {
  constructor(state) {
    this.heading = 'Shelves';
    this.state = state;

    this.getShelves = () => {
      httpClient.fetch('http://django-env.mvsm3depy3.eu-central-1.elasticbeanstalk.com/en/api/shelves/shelves/')
      .then(response => response.json())
      .then(data => {
        // console.log(data);
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
    httpClient.fetch('http://django-env.mvsm3depy3.eu-central-1.elasticbeanstalk.com/en/api/shelves/shelves/', {
      headers: {
        'Authorization': 'JWT ' + this.state.token,
        'Accept': 'application/json',
        'X-Requested-With': 'Fetch'
      },
      method: 'post',
      body: json(shelf)
    })
    .then(response => response.json())
    .then(data => {
      console.log(data);
      if (data.id) {
        alert(`Shelf ${data.id} created!`);
        // Append the new data to the shelves list.
        this.shelves.results.push(data);
      }
      // console.log(this.state.token);
    })
    .catch(error => {
      console.log(error);
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
