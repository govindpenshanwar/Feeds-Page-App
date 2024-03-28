import React, { useState, useEffect } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';

function Admin() {
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:4000/api/getAllPosts')
            .then(response => {
                setPosts(response.data.message);
            })
            .catch(error => {
                console.error('Error fetching posts:', error);
            });
    }, []);

    const handleAcceptPost = async (postId) => {
        try {
            await axios.post('http://localhost:4000/accept-post', { postId }, { withCredentials: true });
            setPosts(posts.filter(post => post.id !== postId));
            toast.success("Post Approved")
        } catch (error) {
            console.error('Error accepting post:', error);
        }
    };

    const handleDeletePost = async (postId) => {
        try {
            await axios.delete(`http://localhost:4000/delete-post/${postId}`, { withCredentials: true });
            setPosts(posts.filter(post => post.id !== postId));
            toast.success("Post Deleted")
        } catch (error) {
            console.error('Error deleting post:', error);
        }
    };

    return (
        <div className='flex flex-col justify-center items-center mt-10 gap-5'>
            <h2 className='text-xl font-bold'>Admin Panel</h2>

            {posts.map(post => (
                <ul className='flex flex-col gap-2 ' key={post.id}>

                    <div>{post.post}</div>
                    <div>Date : {post.post_date}</div>
                    <div>Created : {post.username}</div>
                    <div className='flex flex-row gap-4'>
                        <button
                            className='w-24 bg-zinc-900 text-white text-lg font-semibold p-2'
                            onClick={() => handleAcceptPost(post.id)}>Accept</button>
                        <button
                            className='w-24 bg-zinc-900 text-white text-lg font-semibold p-2'
                            onClick={() => handleDeletePost(post.id)}>Delete</button>
                    </div>
                </ul>
            ))}

        </div>
    );
}

export default Admin;
