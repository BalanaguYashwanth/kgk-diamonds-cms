export class PluginStore {
  registeredPlugins;
  constructor() {
    this.registeredPlugins = [];
  }

  registerPlugin(plugin) {
    this.registeredPlugins.push(plugin);
  }

  getPlugins() {
    return this.registeredPlugins;
  }
}
