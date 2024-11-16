export default class VideoEmbedPlugin {
  pluginSystem;

  constructor(pluginSystem) {
    this.pluginSystem = pluginSystem;
  }

  boot() {
    this.pluginSystem.registerComponent(this.getComponent());
  }

  getComponent() {
    return {
      name: 'VideoEmbed',
      component: () => import('./VideoEmbedComponent'),
    };
  }
}
