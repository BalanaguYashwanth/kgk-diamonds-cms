"use client";
import { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { useParams } from "next/navigation";
import ReactQuill from "react-quill-new";
import { initialPost } from "../../../common/constants";
import { usePluginContext } from "../../../context/PluginContext";
import { createPosts, fetchPostsById, updatePostsById } from "../../../common/api.action";
import "react-quill/dist/quill.snow.css";
import "../post.css";

const Post = () => {
  const [plugins, setPlugins] = useState([])
  const { pluginSystem } = usePluginContext();
  const VideoEmbedComponent = pluginSystem.getComponent('videoEmbed');

  const params = useParams();
  const { id: slug } = params;
  const [post, setPost] = useState({ ...initialPost });
  const [editorKey, setEditorKey] = useState(0);
  const [videoUrl, setVideoUrl] = useState('');

  const editorStyle = {
    height: "300px",
    lineHeight: "1.8",
    fontSize: "16px",
    borderRadius: "15px",
  };

  const handleSubmit = async () => {
    try {
      const toastId = toast.loading("Loading");
      if (slug) {
        await updatePostsById(slug, {
          title: post.title,
          slug: post.slug,
          content: post.content,
        });
      } else {
        await createPosts({
          title: post.title,
          slug: post.slug,
          content: post.content,
          plugins
        });
        setPost({...initialPost });
      }
      toast.dismiss(toastId);
      toast.success("Published");
    } catch (err) {
      toast.dismiss();
      toast.error("Failed to create the post");
    }
    setEditorKey(editorKey + 1);
    setVideoUrl("")
  };

  const handlePreview = () => {
    localStorage.setItem("previewData", JSON.stringify({ ...post, plugins }));
    window.open("/preview", "_blank");
  };

  const getPostsById = async () => {
    try{
      toast.loading('Loading')
      const response = await fetchPostsById(slug);
      const plugins = response.plugins;
      for(let plugin of plugins){
        if(plugin.type === 'videoEmbed'){
          setVideoUrl(plugin.data.videoUrl)
        }
      }
      setPost(response.post);
      setPlugins(response.plugins)
      toast.dismiss();
    }catch(error){
      toast.dismiss();
      toast.error('Failed to load content')
    }
  };

  useEffect(() => {
    if (slug) {
      getPostsById();
    }
  }, [slug]);

  const handleFieldChange = (field, value) => {
    setPost((prevPost) => ({
      ...prevPost,
      [field]: value,
    }));
  };

  const handleVideoInputChange = (e) => {
    const url = e.target.value;
    setVideoUrl(url);
    setPlugins([{
      type: "videoEmbed",
      data: {videoUrl: url},
    }])
  };

  const conditionallyRenderEmbedded = () => {
    if(slug){
      if(!videoUrl){
        return false
      }
    }

    if((VideoEmbedComponent)){
      return true
    }
  }
  
  return (
    <main className="post-container">
      <Toaster />
      <h1>New post</h1>
      <article>
        <p id="bold">Title</p>
        <input
          onChange={(e) => handleFieldChange("title", e.target.value)}
          value={post.title}
        />
      </article>
      <article>
        <p id="bold">Slug</p>
        <input
          onChange={(e) => handleFieldChange("slug", e.target.value)}
          value={post.slug}
        />
      </article>
      <article className="margin-bottom-spacing">
        <p id="bold">Content</p>
        <ReactQuill
          key={editorKey}
          style={editorStyle}
          onChange={(value) => handleFieldChange("content", value)}
          value={post.content}
        />
      </article>

    {conditionallyRenderEmbedded() &&  <article className="margin-top-spacing">
        <p id="bold">Video Embedded URL (Plugin)</p>
        <input
          disabled={slug}
          type="text"
          placeholder="Enter embeded video URL"
          value={videoUrl}
          onChange={handleVideoInputChange}
        />
        <p className="font-small"> Sample youtube url - https://www.youtube.com/embed/THAyNhvAOz8?si=TC_TWBAQYSlnsZ4s</p>
      </article>}

      {VideoEmbedComponent && videoUrl && (
        <article className="margin-top-spacing">
          <VideoEmbedComponent key='yt' videoUrl={videoUrl} />
        </article>
      )}

    <article className="buttons">
      <button onClick={handlePreview}>
        Preview
      </button>
      <button onClick={handleSubmit}>
        Publish
      </button>
    </article>
    </main>
  );
};

export default Post;
