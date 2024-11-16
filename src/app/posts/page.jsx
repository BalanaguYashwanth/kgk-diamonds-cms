"use client"
import { useEffect, useState } from 'react';
import { useRouter } from "next/navigation";
import toast, { Toaster } from 'react-hot-toast';
import { paths } from '../../common/constants';
import PostTable from '@/components/PostsTable/postTable';
import { deletePostById, fetchPosts } from '../../common/api.action';
import './posts.css';

const Posts = () => {
    const router = useRouter();
    const [myPosts, setMyPosts] = useState([])

    const getPosts = async () => {
        try {
            toast.loading('Loading')
            const data = await fetchPosts();
            setMyPosts(data?.posts || [])
            toast.dismiss()
        } catch (error) {
            toast.dismiss()
            toast.error('An error occurred while fetching Posts');
        }
    }

    const handleDelete = async (id) => {
        try {
            toast.loading('Deleting')
            await deletePostById(id)
            toast.dismiss()
            toast.success('Deleted')
        } catch (err) {
            toast.dismiss()
            toast.error('An error occurred while deleting Post');
        }
    }

    const handleEdit = (slug) => {
        router.push(`${paths.post}/${slug}`)
    }

    const handlePostRedirection = () => {
        router.push(`${paths.post}`)
    }

    useEffect(() => {
        getPosts()
    }, [])

    return (
        <main className='post-container'>
            <Toaster />
            <div className='justify-between'>
                <h1>Posts</h1>
                <button onClick={handlePostRedirection}>➕</button>
            </div>
            {myPosts.length ? (<PostTable myPosts={myPosts} handleDelete={handleDelete} handleEdit={handleEdit} />) : <p>No posts found</p>}
        </main>
    )
}

export default Posts;