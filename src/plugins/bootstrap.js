import { PluginSystem } from './plugin-system/core/PluginSystem';
import plugins from './plugins';

const pluginSystem = new PluginSystem();

plugins.forEach(plugin => {
  pluginSystem.registerPlugin(new plugin(pluginSystem));
});

pluginSystem.bootPlugins();

export default pluginSystem;
