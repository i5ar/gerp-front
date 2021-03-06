import {json} from 'aurelia-fetch-client';
import {inject} from 'aurelia-framework';
import {State} from 'state';
import {Router} from 'aurelia-router';

@inject(State, Router)
export class Login {
  constructor(state, router) {
    this.heading = 'Login';
    this.state = state;
    /**
     * Redirect after login.
     */
    this.redirectLogin = () => {
      router.navigate('shelves');
    };
  }

  username = 'admin';
  password = '';
  /**
   * Post binded customer and container id from a form.
   * {@link http://aurelia.io/hub.html#/doc/article/aurelia/fetch-client/latest/http-services/}
   */
  postLogin() {
    let loginForm = {username: this.username, password: this.password};

    this.state.http.fetch('api-token-auth/', {
      method: 'post',
      body: json(loginForm)
    })
    .then(response => response.json())
    .then(data => {
      // Set username and token
      this.state.username = this.username;
      this.state.token = data.token;
      // console.log(data.token);
      if (data.token) {
        alert('Authenticated!');
        this.redirectLogin();
      } else if (data.non_field_errors) {
        alert(`${data.non_field_errors} Please try again.`);
      }
    })
    .catch(error => {
      alert('Login error!');
    });
  }

}
