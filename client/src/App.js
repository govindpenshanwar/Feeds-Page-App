import { Link, Route, Routes, useLocation, useNavigate } from 'react-router-dom';
import './App.css';
import LoginPage from './Components/Login/LoginPage';
import Signup from './Components/signUp/Signup';
import Posts from './Components/Posts/Posts';
import MyPosts from './Components/MyPosts/MyPosts';
import AllPosts from './Components/AllPosts/AllPosts';
import axios from 'axios';
import Admin from './Components/Admin/Admin';
import UpdatePost from './Components/UpdatePost/UpdatePost';
import toast, { Toaster } from 'react-hot-toast';
import OtherPost from './Components/OtherPost/OtherPost';
import { useEffect, useState } from 'react';

function App() {
  const navigate = useNavigate();
  const location = useLocation();
  const [isLoggedIn, setIsLoggedIn] = useState(false);


  useEffect(() => {
    const checkLoginStatus = async () => {
      try {
        const response = await axios.get('http://localhost:4000/checkLogin', { withCredentials: true });
        setIsLoggedIn(response.data.isLoggedIn);
      } catch (error) {
        console.log("Error checking login status:", error.message);
      }
    };
    checkLoginStatus();
  }, [location])

  const logout = async () => {
    try {
      await axios.get('http://localhost:4000/logout', { withCredentials: true });
      toast.success("Logout Successfull");
      navigate('/');
      setIsLoggedIn(false);
    } catch (error) {
      console.error("Err logging out", error.message);
    }
  }
  return (
    <>
      <div>
        <ul className='flex flex-row gap-6 items-center justify-center m-5 font-bold text-2xl'>
          {!isLoggedIn && <Link to={'/'}><li>Login</li></Link>}
          {!isLoggedIn && <Link to={'/signup'}><li>SignUp</li></Link>}
          {isLoggedIn && <Link to={'#'}><li onClick={logout}>Logout</li></Link>}
          {isLoggedIn && <Link to={'/otherPosts'}><li>All Posts</li></Link>}

        </ul>
      </div>
      <Toaster
        toastOptions={{
          style: {
            background: 'rgb(51,65,85)',
            color: 'white'
          }
        }} />
      <Routes>
        <Route path='/' element={<LoginPage />} />
        <Route path='/signup' element={<Signup />} />
        <Route path='/posts/:username' element={<Posts />} />
        <Route path='/Myposts/:username' element={<MyPosts />} />
        <Route path='/AllPosts/:username' element={<AllPosts />} />
        <Route path='/admin' element={<Admin />} />
        <Route path='/updatePost/:postId' element={<UpdatePost />} />
        <Route path='/otherPosts' element={<OtherPost />} />
      </Routes>
    </>
  );
}

export default App;
