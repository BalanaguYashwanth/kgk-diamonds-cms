"use client";
import { Toaster } from "react-hot-toast";
import usePost from "@/hooks/usePost";
import PostForm from "@/components/PostForm/postForm";
import PluginView from "@/components/PluginView/pluginView";
import "../post.css";
import "react-quill/dist/quill.snow.css";

const Post = () => {
  const { editorKey, handleFieldChange, handlePreview, handleSubmit, handleVideoInputChange, post, slug, videoUrl} = usePost();

  return (
    <main className="post-container">
      <Toaster />
      <h1>New post</h1>
      <PostForm handleFieldChange={handleFieldChange} post={post} editorKey={editorKey}/>
      {<PluginView handleVideoInputChange={handleVideoInputChange} slug={slug} videoUrl={videoUrl}/>}
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
