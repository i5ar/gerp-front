export class App {

  configureRouter(config, router) {
    config.map([
      {
        route: ['', 'home'],
        name: 'home',
        moduleId: 'home',
        nav: true,
        title: 'Home'},
      {
        route: 'binders',
        name: 'binders',
        moduleId: 'binders',
        nav: true,
        title: 'Binders (all)'},
      {
        route: 'customers',
        name: 'customers',
        moduleId: 'customers',
        nav: true,
        title: 'Customers (filtered)'},
      {
        route: 'shelves',
        name: 'shelves',
        moduleId: 'shelves',
        nav: true,
        title: 'Shelves (filtered)'},
      {
        route: 'shelves/:id',
        name: 'shelf',
        moduleId: 'shelves/shelf',
        nav: false,
        title: 'Shelf'},

      { route: 'login',
        name: 'login',
        moduleId: 'login',
        nav: true,
        title: 'Login'}
    ]);

    this.router = router;
  }
}
