"use client"
import { useEffect, useState } from 'react';
import { useRouter } from "next/navigation";
import {initialPost, paths} from '../../common/constants'
import { fetchPosts } from '../../common/api.action';
import toast from 'react-hot-toast';
import './posts.css'

const Posts = () => {
    const router = useRouter();
    const [myPosts, setMyPosts] = useState([{...initialPost}])

    const getPosts = async () => {
        try{
            toast.loading('Loading')
            const data = await fetchPosts();
            setMyPosts(data?.posts || [])
            toast.dismiss()
        }catch(error){
            toast.error(`Error occured ${error.message}`)
        }
    }

    const handleEdit = (slug) => {
        router.push(`${paths.post}/${slug}`)
    }

    const handlePostRedirection = () => {
        router.push(`${paths.post}`)
    }

    useEffect(()=>{
        getPosts()
    },[])

    return (
        <main className='post-container'>
            <div className='justify-between'>
                <h1>Posts</h1>
                <button onClick={handlePostRedirection}>+</button>
            </div>
            <table className='posts-table'>
                <thead>
                    <tr>
                        <th>Title</th>
                        <th>Slug</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody >
                {
                    myPosts.length && myPosts?.map((post, index) => (
                        <tr key={`post-${index}`}>
                            <td>{post.title}</td>
                            <td>{post.slug}</td>
                            <th>
                                <button onClick={()=>handleEdit(post.slug)}>✏️</button>
                                <button>🗑️</button>
                            </th>
                        </tr>
                    ))
                }
                </tbody>
            </table>
        </main>
    )
}

export default Posts;