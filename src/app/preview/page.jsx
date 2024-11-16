"use client";
import { useEffect, useState } from "react";
import { usePluginContext } from "../../context/PluginContext";
import "./preview.css";

const Preview = () => {
  const [post, setPost] = useState(null);
  const { pluginSystem } = usePluginContext();

  useEffect(() => {
    const previewData = JSON.parse(localStorage.getItem("previewData"));
    setPost(previewData);
  }, []);

  if (!post) return <p>Loading preview...</p>;

  return (
    <main className="preview-container">
      <h1>{post.title}</h1>
      <p className="slug">Slug: {post.slug}</p>
      <article dangerouslySetInnerHTML={{ __html: post.content }}></article>

      {post.plugins.map((plugin, idx) => {
        const PluginComponent = pluginSystem.getComponent(plugin.type);
        return PluginComponent ? (
          <div className="plugin-container" key={idx}>
            <h2>{plugin.type} Plugin</h2>
            <PluginComponent {...plugin.data} />
          </div>
        ) : null;
      })}

      <div className="footer">This is a preview content</div>
    </main>
  );
};

export default Preview;
