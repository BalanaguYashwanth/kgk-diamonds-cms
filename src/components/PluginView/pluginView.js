import { usePluginContext } from "@/context/PluginContext";

const PluginView = ({ handleVideoInputChange, slug, videoUrl }) => {
    const { pluginSystem } = usePluginContext();
    const VideoEmbedComponent = pluginSystem.getComponent('videoEmbed');

    const conditionallyRenderEmbeddedPlugin = () => {
        if (slug) {
            if (!videoUrl) {
                return false
            }
        }
        if ((VideoEmbedComponent)) {
            return true
        }
    }

    return conditionallyRenderEmbeddedPlugin() && (
        <>
            <article className="margin-top-spacing">
                <p id="bold">Video Embedded URL (Plugin)</p>
                <input
                    disabled={slug}
                    type="text"
                    placeholder="Enter embeded video URL"
                    value={videoUrl}
                    onChange={handleVideoInputChange}
                />
                <p className="font-small"> Sample youtube url - https://www.youtube.com/embed/THAyNhvAOz8?si=TC_TWBAQYSlnsZ4s</p>
            </article>

            {VideoEmbedComponent && videoUrl && (
                <article className="margin-top-spacing">
                    <VideoEmbedComponent key='yt' videoUrl={videoUrl} />
                </article>
            )}
        </>
    )
}

export default PluginView