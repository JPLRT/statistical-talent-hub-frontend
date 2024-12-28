import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './CommunityMembers.css';
import {Link} from 'react-router-dom'
const CommunityMembers = () => {
   const [users, setUsers] = useState([]);

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
}, []);
return (
   <div className="community-members-container">
           <h2>Community Members</h2>
         <ul className="members-list">
             {users.filter(user=>user.isActive).map(user => (
             <li key={user._id} className="member-card">
                <Link to={`/profile/${user._id}`} className="member-link">
                    {user.profile?.profilePic &&  <img src={user.profile.profilePic} alt="Profile pic" className="member-pic" />}
                   <div className="member-details">
                       <p className="member-name">{user.name}</p>
                        <p className="member-profession">{user.current_job_role}</p>
                    </div>
                 </Link>
            </li>
             ))}
          </ul>
    </div>
  );
};
export default CommunityMembers;