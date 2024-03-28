
import axios from 'axios';
import React, { useState } from 'react';
import toast from 'react-hot-toast';
import { useNavigate, useParams } from 'react-router-dom';

function Posts() {
    const [postData, setPostData] = useState("");
    // const [username, setUsername] = useState(""); // Add username state
    const navigate = useNavigate();

    const { username } = useParams();
    const handlePost = async () => {
        try {

            const postObj = {
                username: username,
                post: postData
            };
            const API = await axios.post('http://localhost:4000/post', postObj);
            const res = API.data;
            toast.success("Post Created Successfully !!")
            console.log("RESPONSE => ", res);
        } catch (error) {
            console.error("Error posting posts at posts page => ", error.message);
        }
    };

    const handleMyPosts = () => {
        navigate(`/Myposts/${username}`)
    }

    const handleAllPosts = () => {
        navigate(`/AllPosts/${username}`)
    }

    return (
        <div className='flex flex-col gap-5 items-center justify-center mt-20'>
            <input
                type="text"
                className='border p-2'
                placeholder='Enter Your post'
                value={postData}
                onChange={(e) => setPostData(e.target.value)}
            />
            <button
                className='w-36 hover:scale-105 transition-all p-2 bg-zinc-900 text-white'
                onClick={handlePost}>Create Post</button>
            <button
                className='w-36 hover:scale-105 transition-all p-2 bg-zinc-900 text-white'
                onClick={handleMyPosts}
            >See My Posts</button>

            <button
                className='w-36 hover:scale-105 transition-all p-2 bg-zinc-900 text-white'
                onClick={handleAllPosts}>See all Posts</button>
        </div>
    );
}

export default Posts;
