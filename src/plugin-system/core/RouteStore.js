export class RouteStore {
    routes= [];
  
    registerRoute(route) {
      this.routes.push(route);
    }
  
    getRoutes() {
      return this.routes;
    }
  }
  