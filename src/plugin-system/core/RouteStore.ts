export class RouteStore {
    private routes: any[] = [];
  
    registerRoute(route: any) {
      this.routes.push(route);
    }
  
    getRoutes() {
      return this.routes;
    }
  }
  