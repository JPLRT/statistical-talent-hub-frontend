import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import './ProfileDetails.css';

const ProfileDetails = () => {
   const { id } = useParams();
    const [user, setUser] = useState(null);
    const [error, setError] = useState('');

   useEffect(() => {
        const fetchUserData = async () => {
            try {
                const response = await axios.get(`http://localhost:5000/api/users/${id}`);
                setUser(response.data);
            } catch (err) {
                 setError('Failed to load user data.');
            }
      };
       fetchUserData();
    }, [id]);

    if (!user) return <p>Loading user profile...</p>;

   return (
        <div className="profile-details-container">
             <div className="profile-details-card">
                  <div className="profile-header">
                       {user.profilePic && <img src={user.profilePic} alt="Profile pic" className="profile-pic" />}
                        <h2>{user.name}'s Profile</h2>
                 </div>
                <div>
                     {user.aboutMe && <p><strong>About Me:</strong> {user.aboutMe}</p>}
                       {user.skills && <p><strong>Skills:</strong> {user.skills}</p>}
                      <p><strong>Year of Graduation:</strong> {user.year_of_graduation}</p>
                       <p><strong>Qualification:</strong> {user.qualification}</p>
                       <p><strong>Current Job Role:</strong> {user.current_job_role}</p>
                      <p><strong>Current Working Organization:</strong> {user.current_working_organization}</p>
                     <p><strong>Current Field of Work:</strong> {user.current_field_of_work}</p>
                       <p><strong>Current Location:</strong> {user.current_location}</p>
                     <p><strong>Working Experience Years:</strong> {user?.working_experience_years}</p>
              </div>
           </div>
        </div>
   );
};

 export default ProfileDetails;