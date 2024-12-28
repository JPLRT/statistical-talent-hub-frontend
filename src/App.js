import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, useNavigate } from 'react-router-dom';
import Login from './components/Login';
import Home from './pages/Home';
import Admin from './pages/Admin';
import ProfileDetails from './pages/ProfileDetails';
import Layout from './components/Layout';
import './App.css';
import axios from 'axios';

function App() {
    const [loggedIn, setLoggedIn] = useState(!!localStorage.getItem('userId'));
     const [isAdmin, setIsAdmin] = useState(localStorage.getItem('isAdmin') === 'true');
    const navigate = useNavigate();

    const handleLogin = async (userId) => {
           localStorage.setItem('userId', userId);
         try {
             const response = await axios.get(`http://localhost:5000/api/users/${userId}`);
                 localStorage.setItem('isAdmin', response.data.isMentor);
                setIsAdmin(response.data.isAdmin);
            } catch (error) {
                console.error('Error fetching user:', error);
            }
        setLoggedIn(true);
         navigate('/');
     };

      return (
        <Layout loggedIn={loggedIn} isAdmin={isAdmin}>
             {loggedIn ? (
                <Routes>
                    <Route path="/*" element={<Home/>} />
                     <Route path="/admin" element={<Admin />} />
                    <Route path="/profile/:id" element={<ProfileDetails/>} />
                </Routes>
             ) : (
                  <Login onLogin={handleLogin} />
            )}
       </Layout>
      );
   }

   function AppWrapper() {
        return (
           <Router>
               <App />
          </Router>
      );
   }
    export default AppWrapper;