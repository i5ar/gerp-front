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
   * Get binders.
   * {@link http://aurelia.io/hub.html#/doc/article/aurelia/fetch-client/latest/http-services/}
   */
  getBinders() {
    this.state.http.fetch('api/shelves/binders/', {
      headers: {
        'Authorization': 'JWT ' + this.state.token
      }
    })
    .then(response => response.json())
    .then(data => {
      // console.log(data);
      this.binders = data;
    });
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
        'Authorization': 'JWT ' + _state.token
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
   * Get binder from a form.
   * If we want to reuse the method we must pass the form fields as arguments.
   * @param {String} _state The state
   * @param {String} _binderId The container id field
   */
  getBinder(_state, _binderId) {
    _state.http.fetch('api/shelves/binders/' + _binderId + '/?format=json', {
      headers: {
        'Authorization': 'JWT ' + _state.token
      },
      method: 'get'
    })
    .then(response => response.json())
    .then(data => {
      // console.log(data);
      this.binder = data;
    })
    .catch(error => {
      alert('Binder error!');
    });
  }

  /**
   * Put binder from a form.
   * If we want to reuse the method we must pass the form fields as arguments.
   * @param {String} _state The state
   * @param {String} _title The title field
   * @param {String} _customer The customer field
   * @param {String} _containerId The container id field
   * @param {String} _binderId The container id field
   */
   putBinder(_state, _title, _customer, _containerId, _binderId) {
     let binderForm = {
       title: _title,
       customer: _customer,
       container_id: _containerId
     };
     _state.http.fetch('api/shelves/binders/' + _binderId + '/?format=json', {
       headers: {
         'Authorization': 'JWT ' + _state.token
       },
       method: 'put',
       body: json(binderForm)
     })
     .then(response => response.json())
     .then(data => {
       // console.log(data);
       alert('Binder updated!');
     })
     .catch(error => {
       alert('Binder error!');
     });
   }

   /**
    * Delete binder from a form.
    * If we want to reuse the method we must pass the form fields as arguments.
    * @param {String} _state The state
    * @param {String} _binderId The container id field
    */
   deleteBinder(_state, _binderId) {
     _state.http.fetch('api/shelves/binders/' + _binderId + '/?format=json', {
       headers: {
         'Authorization': 'JWT ' + _state.token
       },
       method: 'delete'
     })
     .then(data => {
       // console.log(data);
       if (data.ok) {
         alert('Binder deleted!');
       }
     })
     .catch(error => {
       alert('Binder error!');
     });
   }

}
