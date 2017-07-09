import {HttpClient, json} from 'aurelia-fetch-client';

let httpClient = new HttpClient();

export class Binders {
  constructor() {
    this.header = 'Binders';
  }

  customer = '';
  containerId;
  /**
   * Post binded customer and container id from a form.
   * {@link http://aurelia.io/hub.html#/doc/article/aurelia/fetch-client/latest/http-services/}
   */
  postFormData() {
    let binderForm = {customer: this.customer, container_id: this.containerId};
    console.log(binderForm);
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
  getData() {
    httpClient.fetch('http://127.0.0.1:8000/en/api/shelves/binders/')
    .then(response => response.json())
    .then(data => {
      console.log(data);
    });
  }

  /**
   * Post customer and container id.
   * {@link http://aurelia.io/hub.html#/doc/article/aurelia/fetch-client/latest/http-services/}
   */
  postData() {
    let binder = {customer: 'giuseppe', container_id: 737};
    httpClient.fetch('http://127.0.0.1:8000/en/api/shelves/binders/', {
      method: 'post',
      body: json(binder)
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

}
