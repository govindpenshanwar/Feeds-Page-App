import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import toast from 'react-hot-toast';
function SignUp() {
    const [userData, setUserData] = useState({
        username: "",
        password: "",
        email: "",
        role: "",
        phone: ""
    });
    const navigate = useNavigate();

    const handleLogin = async () => {
        try {
            if (userData.username === "" || userData.password === "" || userData.email === "" || userData.role === "" || userData.phone === "") {
                toast.error("Please Enter Credentials");
            } else {
                const API = await axios.post('http://localhost:4000/signUp', userData);
                const res = API.data;
                console.log("User Data", res);
                toast.success("Registration Successfull !!")
                navigate('/')
            };
        } catch (error) {
            console.error("Err at logi page =>", error.message);
        }
    }
    return (
        <div className='flex flex-col justify-center items-center gap-6 mt-40'>
            <p className='text-2xl font-bold'>Signup Page</p>
            <input
                className='border p-2'
                type="text"
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
            <input
                className='border p-2'
                type="email"
                value={userData.email}
                onChange={(e) => setUserData({ ...userData, email: e.target.value })}
                placeholder='enter email'
                required />
            <input type="text"
                className='border p-2'
                value={userData.role}
                onChange={(e) => setUserData({ ...userData, role: e.target.value })}
                placeholder='enter role'
                required />
            <input
                className='border p-2'
                type="text"
                value={userData.phone}
                onChange={(e) => setUserData({ ...userData, phone: e.target.value })}
                placeholder='enter phone number'
                required />

            <button
                className='w-24 hover:scale-105 transition-all p-2 bg-zinc-900 text-white'
                onClick={handleLogin}

            >Signin</button>
            <Link to={'/'}>
                <button
                    className='w-24 hover:scale-105 transition-all p-2 bg-zinc-900 text-white'
                >Login</button></Link>
        </div>
    )
}

export default SignUp

