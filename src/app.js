export class App {

  configureRouter(config, router) {
    config.map([
      { route: ['', 'home'], name: 'home', moduleId: 'home', nav: true, title: 'Home' },
      { route: 'binders', name: 'binders', moduleId: 'binders', nav: true, title: 'Binders' },
      { route: 'customers', name: 'customers', moduleId: 'customers', nav: true, title: 'Customers' }
      // { route: 'shelves', name: 'shelves', moduleId: 'shelves', nav: true, title: 'Shelves' },
      // { route: 'containers', name: 'containers', moduleId: 'containers', nav: true, title: 'Containers' }
    ]);

    this.router = router;
  }
}
