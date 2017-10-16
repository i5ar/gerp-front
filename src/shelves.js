import {json} from 'aurelia-fetch-client';
import {inject} from 'aurelia-framework';
import {State} from 'state';

@inject(State)
export class Shelves {
  constructor(state) {
    this.heading = 'Shelves';
    this.state = state;

    this.getShelves = () => {
      state.http.fetch('api/shelves/shelves/', {
        headers: {'Authorization': 'JWT ' + this.state.token}
      })
      .then(response => response.json())
      .then(data => {
        // console.log(data);
        this.shelves = data;
      });
    };
  }

  cols; rows; nums; name = '';
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
    this.state.http.fetch('api/shelves/shelves/', {
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
      }
      // Append the new data to the shelves list.
      this.shelves.results.push(data);
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
