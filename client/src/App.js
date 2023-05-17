import React, { useEffect } from 'react';
import './App.css';
import { useDispatch, useSelector } from 'react-redux';
import { authActions } from './store';
import { Route, Routes } from 'react-router';
import AddPost from './components/AddPost';
import Auth from './components/Auth';
import Navbar from './components/Navbar';
import Post from './components/Post';
import Posts from './components/Posts';
import UserPosts from './components/UserPosts';


function App() {
  const dispatch = useDispatch();
  const isLoggedIn = useSelector((state) => state.isLoggedIn);
  useEffect(() => {
    if (localStorage.getItem("userId")) {
      dispatch(authActions.siginin());
    }
  }, [dispatch]);

  return (
    <>
      <main>
        <Routes>
          {!isLoggedIn} ? (
            <>
              <Route path='/auth' element={<Auth /> } />
              <Route parth='/' element={<Posts />} />
            </>
          ) : (
            <>
              <Route path='/' element={<Posts /> } />
              <Route path='/posts/add' element={<AddPost /> } />
              <Route path='/myPosts' element={<UserPosts /> } />
              <Route path='/myPosts/:id' element={<PostDetail /> } />
            </>
          )
        </Routes>
      </main>
    </>
  );
}

export default App;
