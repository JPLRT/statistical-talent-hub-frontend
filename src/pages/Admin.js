import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Admin.css';
import UserForm from '../components/UserForm';
import { useNavigate } from 'react-router-dom';

const Admin = () => {
    const [users, setUsers] = useState([]);
     const navigate = useNavigate();
    const isAdmin = localStorage.getItem('isAdmin') === 'true';

    useEffect(() => {
         const fetchUsers = async () => {
             try {
                const response = await axios.get('http://localhost:5000/api/users');
                 setUsers(response.data);
            } catch (error) {
                 console.error('Error fetching users:', error);
             }
         };
        fetchUsers();
        if (!isAdmin) {
           navigate("/");
        }
    }, [isAdmin,navigate]);

    const handleApprove = async (id) => {
        try {
           await axios.put(`http://localhost:5000/api/users/${id}/approve`);
             const updatedUsers = users.map((user) => {
               if (user._id === id) {
                     return { ...user, isActive: true };
                 }
                return user;
           });
           setUsers(updatedUsers);
       } catch (err) {
            console.error('Error approving user:', err);
       }
    };

    const handleUserCreated = (newUser) => {
        setUsers([...users, newUser]);
   };

    return (
        <div className="admin-container">
            <h1>Admin Panel</h1>
             <div className="new-user-form">
                <h2>Add New User</h2>
                  <UserForm onUserCreated={handleUserCreated} />
            </div>
           <h2>User List</h2>
             <ul>
                  {users.map(user => (
                   <li key={user._id}>
                       {user.name} - {user.email} - {user.isActive ? 'Approved' : 'Not Approved'}
                        {!user.isActive && <button onClick={()=>handleApprove(user._id)}>Approve</button>}
                  </li>
               ))}
            </ul>
      </div>
   );
};

 export default Admin;