import {inject} from 'aurelia-framework';
import {State} from 'state';

@inject(State)
export class Home {

  constructor(state) {
    this.heading = 'Home';
    this.state = state;
  }

}
