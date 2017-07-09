import {inject} from 'aurelia-framework';
import {HttpClient} from 'aurelia-fetch-client';
import {State} from 'state';
import {Router} from 'aurelia-router';

@inject(HttpClient, State, Router)
export class Shelf {
  constructor(http, state, router) {
    this.heading = 'Shelf';
    this.http = http;
    this.state = state;

    // Configure fetch
    http.configure(config => {
      config
        .withBaseUrl('http://127.0.0.1:8000/en/api/shelves/shelves/')
        .withDefaults({
          credentials: 'same-origin',
          headers: {
            'Accept': 'application/json',
            'X-Requested-With': 'Fetch'
          }
        });
    });

    this.getShelf = (id) => {
      http.fetch(id)
      .then(response => response.json())
      .then(data => {
        // console.log(data);
        this.shelf = data;
      });
    };

    /**
     * Redirect after delete.
     */
    this.redirectShelf = () => {
      router.navigate('shelves');
    };
  }

  /**
   * Delete shelf.
   */
  deleteShelf() {
    this.http.fetch(this.shelfId, {
      headers: {
        'Authorization': 'JWT ' + this.state.token
      },
      method: 'delete'
    })
    .then(response => response)

    .then(data => {
      // console.log(data);
      if (data.ok) {
        alert('Shelf deleted!');
        this.redirectShelf();
      }
    })

    .catch(error => {
      console.log(error);
    });
  }

  /**
   * Get shelf parameter.
   * {@link https://stackoverflow.com/questions/36787928/}
   * Get shelves on activate or attached? Here we can only use activate because
   * we need the parameters.
   */
  activate(params) {
    this.shelfId = params.id;
    // console.log(params.id);
    this.getShelf(this.shelfId);
  }

}
