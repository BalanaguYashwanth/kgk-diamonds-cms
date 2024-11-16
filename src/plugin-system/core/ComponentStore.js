export class ComponentStore {
    components = {};

    registerComponent({name, component}) {
      this.components[name] = component;
    }
  
    getComponent(name) {
      return this.components[name];
    }
  
    getAllComponents() {
      return this.components;
    }
  }
  