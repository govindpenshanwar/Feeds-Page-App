import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import toast from 'react-hot-toast';

function LoginPage() {
    const [userData, setUserData] = useState({
        username: "",
        password: ""
    });
    const navigate = useNavigate();

    const handleLogin = async () => {
        try {
            if (userData.username === "" || userData.password === "") {
                toast.error("Please enter login credentials")
            }
            else {
                const API = await axios.post('http://localhost:4000/login', userData,
                    { withCredentials: true }
                );
                const res = API.data;
                toast.success("Login Successfull !!")
                if (res.role === 'admin') {
                    navigate('/admin');
                } else {
                    console.log("User Data", res);
                    navigate(`/posts/${userData.username}`)
                }


            }
        } catch (error) {
            console.error("Err at login page =>", error.message);
        }
    }

    return (
        <div className='flex flex-col justify-center items-center gap-6 mt-40'>
            <p className='text-center text-xl  font-bold'>Login Page</p>
            <input
                type="text"
                className='border p-2'
                value={userData.username}
                onChange={(e) => setUserData({ ...userData, username: e.target.value })}
                placeholder='enter username'
                required />
            <input type="password"
                className='border p-2'
                value={userData.password}
                onChange={(e) => setUserData({ ...userData, password: e.target.value })}
                placeholder='enter password'
                required />
            <button
                className='w-24 hover:scale-105 transition-all p-2 bg-zinc-900 text-white'
                onClick={handleLogin}
            >Login</button>

            <Link to={'/signup'}>
                <button
                    className='w-24 hover:scale-105 transition-all p-2 bg-zinc-900 text-white'
                >Signup</button></Link>

        </div>
    )
}

export default LoginPage
