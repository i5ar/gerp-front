import {HttpClient} from 'aurelia-fetch-client';

let httpClient = new HttpClient();

/**
 * Global resources
 * {@link https://stackoverflow.com/questions/35217549/}
 */
export class State {
  constructor() {
    // Configure fetch
    this.http = httpClient.configure(config => {
      config
        .withBaseUrl('http://127.0.0.1:8000/en/')
        .withDefaults({
          credentials: 'same-origin',
          headers: {
            'Accept': 'application/json',
            'X-Requested-With': 'Fetch'
          }
        });
    });

    // Set username and token
    this.username;
    this.token;
  }
}
