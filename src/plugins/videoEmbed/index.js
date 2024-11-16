import VideoEmbedComponent from './component';

class VideoEmbedPlugin {
  constructor(pluginSystem) {
    this.pluginSystem = pluginSystem;
  }

  boot() {
    this.pluginSystem.registerComponent({
      name: 'videoEmbed',
      component: VideoEmbedComponent,
    });
  }
}

export default VideoEmbedPlugin;
