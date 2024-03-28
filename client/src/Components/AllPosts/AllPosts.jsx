import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';

function AllPosts() {
    const [data, setData] = useState([]);
    const { username } = useParams();

    useEffect(() => {
        const fetchData = async () => {
            const api = await axios.get(`http://localhost:4000/api/getOtherPosts/${username}`);
            const res = api.data;
            setData(res.message);
            console.log(res.message);
        }
        fetchData();
    }, [])
    return (
        <div className='flex flex-col text-center mt-10'>
            <p className='text-xl font-bold'>All Posts</p>
            {data.map((post) => (
                <ul
                    className='mt-10'
                    key={post.id}>
                    <li className='text-lg font-semibold'>{post.post}</li>
                    <li className='text-lg font-semibold'>Created By : {post.username}</li>
                    <li className='text-lg font-semibold'>Date : {post.post_date}</li>
                </ul>
            ))}
        </div>
    )
}

export default AllPosts
