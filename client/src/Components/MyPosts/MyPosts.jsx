import axios from 'axios';
import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast';
import { useParams, Link } from 'react-router-dom'

function MyPosts() {
    const { username } = useParams();
    const [data, setData] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const api = await axios.get(`http://localhost:4000/api/getPosts/${username}`);
                const res = api.data;
                setData(res.message);
                console.log("MY posts => ", res);

            } catch (error) {
                console.error("err getting my data => ", error.message);
            }
        }
        fetchData();
    }, [])

    const handleDelete = async (postId) => {
        try {
            await axios.post('http://localhost:4000/deletePost', { postId });
            toast.success("Post Deleted Successfully !!")
        } catch (error) {
            console.error("Error deleting post: ", error.message);
        }
    };

    return (
        <div className='flex flex-col items-center justify-center mt-20 gap-3 '>
            <p className='text-2xl font-bold'>My Posts</p>
            {data.map((post) => (
                <ul className='flex flex-col gap-6 mb-5' key={post.id}>
                    <li>{post.post}</li>
                    <li> Date : {post.post_date}</li>
                    <li> Created : {post.username}</li>
                    <div className='flex flex-row gap-6'>
                        <button className='w-24 hover:scale-105 transition-all p-2 bg-zinc-900 text-white'
                            onClick={() => handleDelete(post.id)}
                        >Delete</button>

                        <Link to={`/updatePost/${post.id}`}><button className='w-24 hover:scale-105 transition-all p-2 bg-zinc-900 text-white'>Update</button></Link>
                    </div>

                </ul>
            ))}
        </div>
    )
}

export default MyPosts
