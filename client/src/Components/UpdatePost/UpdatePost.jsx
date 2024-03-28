import axios from 'axios';
import React, { useState } from 'react';
import toast from 'react-hot-toast';
import { useParams } from 'react-router-dom';

function UpdatePost() {
    const { postId } = useParams();
    console.log("Post id at client => ", postId);
    const [updatedPost, setUpdatedPost] = useState("");

    // const navigate = useNavigate();

    const handleUpdate = async () => {

        try {
            if (updatedPost === "") {
                toast.error("Please add the post to update");
            } else {
                await axios.put(`http://localhost:4000/updatePost/${postId}`, { updatedPost });
                toast.success("Post updated successfully");
            }

        } catch (error) {
            console.error("Error updating post: ", error.message);
        }
    };

    return (
        <div className='flex flex-col gap-5 items-center justify-center mt-20'>
            <input
                type="text"
                className='border p-2'
                placeholder='Enter updated post'
                value={updatedPost}
                onChange={(e) => setUpdatedPost(e.target.value)}
            />
            <button
                className='w-36 hover:scale-105 transition-all p-2 bg-zinc-900 text-white'
                onClick={handleUpdate}>Update Post</button>
        </div>
    );
}

export default UpdatePost;
