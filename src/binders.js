import {HttpClient, json} from 'aurelia-fetch-client';

let httpClient = new HttpClient();

export class Binders {
  constructor() {
    this.heading = 'Binders';
  }

  customer = '';
  containerId;
  /**
   * Post binder from a form.
   * {@link http://aurelia.io/hub.html#/doc/article/aurelia/fetch-client/latest/http-services/}
   */
  postBinder() {
    let binderForm = {customer: this.customer, container_id: this.containerId};
    httpClient.fetch('http://127.0.0.1:8000/en/api/shelves/binders/', {
      method: 'post',
      body: json(binderForm)
    })
    .then(response => response.json())
    .then(data => {
      console.log(data);
      alert(`Binder saved! Customer: ${data.customer}`);
    })
    .catch(error => {
      alert('Binder not saved!');
    });
  }

  /**
   * Get binders.
   * {@link http://aurelia.io/hub.html#/doc/article/aurelia/fetch-client/latest/http-services/}
   */
  getBinders() {
    httpClient.fetch('http://127.0.0.1:8000/en/api/shelves/binders/')
    .then(response => response.json())
    .then(data => {
      console.log(data);
    });
  }

}
