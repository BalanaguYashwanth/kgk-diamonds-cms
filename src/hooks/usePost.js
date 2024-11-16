import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useParams } from "next/navigation";
import { initialPost } from "../common/constants";
import { createPosts, fetchPostBySlug, updatePostBySlug } from "../common/api.action";

const usePost = () => {
    const [plugins, setPlugins] = useState([])
    const params = useParams();
    const { id: slug } = params;
    const [post, setPost] = useState({ ...initialPost });
    const [editorKey, setEditorKey] = useState(0);
    const [videoUrl, setVideoUrl] = useState('');
  
    const handleSubmit = async () => {
      try {
        const toastId = toast.loading("Loading");
        if (slug) {
          await updatePostBySlug(slug, {
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
          setPost({ ...initialPost });
          setPlugins([])
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
      try {
        toast.loading('Loading')
        const response = await fetchPostBySlug(slug);
        const plugins = response.plugins;
        for (let plugin of plugins) {
          if (plugin.type === 'videoEmbed') {
            setVideoUrl(plugin.data.videoUrl)
          }
        }
        setPost(response.post);
        setPlugins(response.plugins)
        toast.dismiss();
      } catch (error) {
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
      if(url){
        setPlugins([{
          type: "videoEmbed",
          data: { videoUrl: url },
        }])
      }else{
        setPlugins([])
      }
      setVideoUrl(url);
    };

    return { editorKey, handleFieldChange,handlePreview, handleSubmit, handleVideoInputChange, post, slug, videoUrl}
}

export default usePost;