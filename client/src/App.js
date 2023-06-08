import React, { useEffect } from 'react';
import './App.css';
import { useDispatch, useSelector } from 'react-redux';
import { authActions } from './store';
import { Route, Routes, useLocation } from 'react-router-dom';
import AddPost from './components/AddPost';
import Auth from './components/Auth';
import Navbar from './components/Navbar';
import UserPosts from './components/UserPosts';
import PostDetail from './components/PostDetail';
import Feed from './components/Feed';

function App() {
  const dispatch = useDispatch();
  const isLoggedIn = useSelector((state) => state.isLoggedIn); 
  const location = useLocation();

  useEffect(() => {
    if (localStorage.getItem("userId")) {
      dispatch(authActions.signin());
    }
  }, [dispatch]);

  useEffect(() => {
    if (!isLoggedIn && location.pathname !== '/') {
      // Redirect to the home page if not logged in
      window.location.href = '/';
    }
  }, [isLoggedIn, location]);

  return (
    <>
      {isLoggedIn && <Navbar />}
      <main>
        <Routes>
          {!isLoggedIn ? (
            <Route path='/' element={<Auth />} />
          ) : (
            <>
              <Route path='/' element={<Feed />} />
              <Route path='/add' element={<AddPost />} />
              <Route path='/myposts' element={<UserPosts />} />
              <Route path='/myposts/:id' element={<PostDetail />} />
            </>
          )}
        </Routes>
      </main>
    </>
  );
}

export default App;
