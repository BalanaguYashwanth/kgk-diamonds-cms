import { ComponentStore } from './plugin-system/core/ComponentStore';
import { PluginStore } from './plugin-system/core/PluginStore';
import { RouteStore } from './plugin-system/core/RouteStore';

export class PluginSystem {
  pluginStore;
  componentStore;
  routeStore;

  constructor() {
    this.pluginStore = new PluginStore();
    this.componentStore = new ComponentStore();
    this.routeStore = new RouteStore();
  }

  registerPlugin(plugin) {
    const pluginInstance = new plugin(this);
    this.pluginStore.registerPlugin(pluginInstance);
  }

  registerComponent(component) {
    this.componentStore.registerComponent(component);
  }

  getComponent(componentName) {
    return this.componentStore.getComponent(componentName);
  }

  bootPlugins() {
    this.pluginStore.registeredPlugins.forEach((plugin) => {
      plugin.boot();
    });
  }
}
