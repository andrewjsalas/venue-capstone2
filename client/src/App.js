import React, { useEffect } from 'react';
import './App.css';
import { useDispatch, useSelector } from 'react-redux';
import { authActions } from './store';
import { Route, Routes, useNavigate } from 'react-router';
import AddPost from './components/AddPost';
import Auth from './components/Auth';
import Navbar from './components/Navbar';
import UserPosts from './components/UserPosts';
import PostDetail from './components/PostDetail';
import Feed from './components/Feed';


function App() {
  const dispatch = useDispatch();
  const isLoggedIn = useSelector((state) => state.isLoggedIn); 
  const navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem("userId")) {
      dispatch(authActions.signin());
      navigate('/');
    }
  }, [dispatch, navigate]);

  return (
    <>
      {isLoggedIn && <Navbar />}
      <main>
        <Routes>
          {!isLoggedIn ? (
            <>
              <Route path='/' element={<Auth /> } />
            </>
          ) : (
            <>
              <Route path='/all' element={<Feed /> } />
              <Route path='/posts/add' element={<AddPost /> } />
              <Route path='/myPosts' element={<UserPosts /> } />
              <Route path='/myPosts/:id' element={<PostDetail /> } />
            </>
          )}
        </Routes>
      </main>
    </>
  );
}

export default App;
