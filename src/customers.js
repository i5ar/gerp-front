import {inject} from 'aurelia-framework';
import {State} from 'state';

@inject(State)
export class Customers {
  constructor(state) {
    this.heading = 'Customers';
    this.state = state;
  }

  /**
   * Get customers data.
   * {@link http://aurelia.io/hub.html#/doc/article/aurelia/fetch-client/latest/http-services/}
   */
  activate() {
    this.state.http.fetch('api/shelves/customers/', {
      headers: {
        'Authorization': 'JWT ' + this.state.token,
        'Accept': 'application/json',
        'X-Requested-With': 'Fetch'
      },
      method: 'get'
    })
    .then(response => response.json())
    .then(data => {
      console.log(data);
      this.customers = data;
    });
  }

}
