import {json} from 'aurelia-fetch-client';
import {inject} from 'aurelia-framework';
import {State} from 'state';

@inject(State)
export class Binders {
  constructor(state) {
    this.heading = 'Binders';
    this.state = state;
    this.binders;
  }

  title = '';
  customer = '';
  containerId;
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

}
