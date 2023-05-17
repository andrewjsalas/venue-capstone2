import React, { useEffect } from 'react';
import './App.css';
import Auth from './components/Auth';
import { useDispatch, useSelector } from 'react-redux';
import { authActions } from './store';
import { Route, Routes } from 'react-router';

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
            </>
          )
        </Routes>
      </main>
    </>
  );
}

export default App;
