import {json} from 'aurelia-fetch-client';
import {inject} from 'aurelia-framework';
import {State} from 'state';

@inject(State)
export class Binders {
  constructor(state) {
    this.heading = 'Binders';
    this.state = state;
    this.binders;
    this.title;
    this.customer;
    this.containerId;
  }

  /**
   * Post binder from a form.
   * If we want to reuse the method we must pass the form fields as arguments.
   * @param {String} _state The state
   * @param {String} _title The title field
   * @param {String} _customer The customer field
   * @param {String} _containerId The container id field
   * {@link http://aurelia.io/hub.html#/doc/article/aurelia/fetch-client/latest/http-services/}
   */
  postBinder(_state, _title, _customer, _containerId) {
    let binderForm = {
      title: _title,
      customer: _customer,
      container_id: _containerId
    };
    _state.http.fetch('api/shelves/binders/', {
      headers: {
        'Authorization': 'JWT ' + _state.token,
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

}
