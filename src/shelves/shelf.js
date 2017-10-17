import {json} from 'aurelia-fetch-client';
import {inject} from 'aurelia-framework';
import {State} from 'state';
import {Router} from 'aurelia-router';

import {Binders} from '../binders';


@inject(State, Router)
export class Shelf {
  constructor(state, router) {
    this.heading = 'Shelf';
    this.state = state;
    /**
     * Redirect after delete.
     */
    this.redirectShelf = () => {
      router.navigate('shelves');
    };
    // Binder form fields
    this.title;
    this.customer;
    this.containerId;
  }

  postBinderFromShelf() {
    // Instantiate the imported class
    let binders = new Binders;
    binders.postBinder(
      this.state, this.title, this.customer, this.containerId);
  };

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

  getShelf = (id) => {
    // NOTE: Firefox require a slash ('/') at the end of the URL.
    this.state.http.fetch('api/shelves/shelves/' + id + '/', {
      headers: {
        'Authorization': 'JWT ' + this.state.token
      }
    })
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
