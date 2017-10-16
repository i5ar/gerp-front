import {inject} from 'aurelia-framework';
import {State} from 'state';
import {Router} from 'aurelia-router';

@inject(State, Router)
export class Shelf {
  constructor(state, router) {
    this.heading = 'Shelf';
    this.state = state;

    this.getShelf = (id) => {
      // NOTE: Firefox require a slash ('/') at the end of the URL.
      this.state.http.fetch('api/shelves/shelves/' + id + '/')
      .then(response => response.json())
      .then(data => {
        // console.log(data);
        this.shelf = data;
      })
      .catch(error => {
        console.log(error);
      })
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
    this.state.http.fetch('api/shelves/shelves/' + this.shelfId + '/?format=json', {
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
