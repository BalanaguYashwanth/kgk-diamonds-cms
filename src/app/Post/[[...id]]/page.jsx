"use client"
import { useEffect, useState } from 'react';
import toast, { Toaster } from "react-hot-toast";
import { useParams } from 'next/navigation';
import ReactQuill from 'react-quill-new';
import { initialPost } from '../../../common/constants';
import { createPosts, fetchPostsById, updatePostsById } from '../../../common/api.action';
import 'react-quill/dist/quill.snow.css';
import '../post.css';

const Post = () => {
    const params = useParams();
    const { id: slug } = params;
    const [post, setPost] = useState({ ...initialPost });
    const [editorKey, setEditorKey] = useState(0);

    const editorStyle = {
        height: '300px',
        lineHeight: '1.8',
        fontSize: '16px',
        borderRadius: '15px',
    };

    const handleSubmit = async () => {
        try {
            const toastId = toast.loading('Loading');
            if (slug) {
                await updatePostsById(slug, { title: post.title, slug: post.slug, content: post.content });
            } else {
                await createPosts({ title: post.title, slug: post.slug, content: post.content });
                setPost({ ...initialPost });
            }
            toast.dismiss(toastId);
            toast.success('Submitted');
        } catch (err) {
            toast.dismiss();
            toast.error('Failed to create the post');
        }
        setEditorKey(editorKey + 1);
    };

    const getPostsById = async () => {
        const response = await fetchPostsById(slug);
        setPost(response.post);
    };

    useEffect(() => {
        if (slug) {
            getPostsById();
        }
    }, [slug]);


    const handleFieldChange = (field, value) => {
        setPost(prevPost => ({
            ...prevPost,
            [field]: value
        }));
    };

    return (
        <main className='post-container'>
            <Toaster />
            <h1>New post</h1>
            <article>
                <p id='bold'>Title</p>
                <input
                    onChange={(e) => handleFieldChange('title', e.target.value)}
                    value={post.title}
                />
            </article>
            <article>
                <p id='bold'>Slug</p>
                <input
                    onChange={(e) => handleFieldChange('slug', e.target.value)}
                    value={post.slug}
                />
            </article>
            <article>
                <p id='bold'>Content</p>
                <ReactQuill
                    key={editorKey}
                    style={editorStyle}
                    onChange={(value) => handleFieldChange('content', value)}
                    value={post.content}
                />
            </article>
            <button className='submit-button' onClick={handleSubmit}>Submit</button>
        </main>
    );
};

export default Post;
