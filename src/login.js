import {HttpClient, json} from 'aurelia-fetch-client';

let httpClient = new HttpClient();

export class Login {
  constructor() {
    this.header = 'Login';
  }

  username = '';
  password = '';
  /**
   * Post binded customer and container id from a form.
   * {@link http://aurelia.io/hub.html#/doc/article/aurelia/fetch-client/latest/http-services/}
   */
  postFormData() {
    let loginForm = {username: this.username, password: this.password};
    console.log(loginForm);
    httpClient.fetch('http://127.0.0.1:8000/en/api/login/', {
      method: 'post',
      body: json(loginForm)
    })
    .then(response => response.json())
    .then(data => {
      console.log(data);
    })
    .catch(error => {
      alert('Login error!');
    });
  }

}
