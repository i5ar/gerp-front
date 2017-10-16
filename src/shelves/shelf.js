import {json} from 'aurelia-fetch-client';
import {inject} from 'aurelia-framework';
import {State} from 'state';
import {Router} from 'aurelia-router';

// TODO: Rename class Binders

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
   * Post binder from a form.
   * {@link http://aurelia.io/hub.html#/doc/article/aurelia/fetch-client/latest/http-services/}
   */
  postBinder() {
    let binderForm = {
      title: this.title,
      customer: this.customer,
      container_id: this.containerId
    };
    this.state.http.fetch('api/shelves/binders/', {
      headers: {
        'Authorization': 'JWT ' + this.state.token,
        'Accept': 'application/json',
        'X-Requested-With': 'Fetch'
      },
      method: 'post',
      body: json(binderForm)
    })
    .then(response => response.json())
    .then(data => {
      // console.log(data);
      alert('Binder created!');
    })
    .catch(error => {
      alert('Binder error!');
    });
  }

  /**
   * Get binders.
   * {@link http://aurelia.io/hub.html#/doc/article/aurelia/fetch-client/latest/http-services/}
   */
  getBinders() {
    this.state.http.fetch('api/shelves/binders/', {
      headers: {
        'Authorization': 'JWT ' + this.state.token,
        'Accept': 'application/json',
        'X-Requested-With': 'Fetch'
      }
    })
    .then(response => response.json())
    .then(data => {
      // console.log(data);
      this.binders = data;
    });
  }

  getShelf = (id) => {
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
