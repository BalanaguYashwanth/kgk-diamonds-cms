export class ComponentStore {
    private components: Record<string, any> = {
    };

    registerComponent({name, component}) {
      this.components[name] = component;
    }
  
    getComponent(name: string) {
      return this.components[name];
    }
  
    getAllComponents() {
      return this.components;
    }
  }
  