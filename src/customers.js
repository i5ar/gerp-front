import {inject} from 'aurelia-framework';
import {HttpClient} from 'aurelia-fetch-client';

@inject(HttpClient)
export class Customers {
  constructor(http) {
    this.header = 'Customers';
    //Configure base URL
    http.configure(config => {
      config
        .withBaseUrl('http://127.0.0.1:8000/en/api/')
        .withDefaults({
          credentials: 'same-origin',
          headers: {
            'Accept': 'application/json',
            'X-Requested-With': 'Fetch'
          }
        });
    });
    this.http = http;
  }

  /**
   * Get customers data.
   * {@link http://aurelia.io/hub.html#/doc/article/aurelia/fetch-client/latest/http-services/}
   */
  activate() {
    this.http.fetch('shelves/customers/')
    .then(response => response.json())
    .then(data => {
      console.log(data);
      this.customers = data;
    });
  }

}
