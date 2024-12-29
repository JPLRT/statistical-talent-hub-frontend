import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './UserProfile.css';

const UserProfile = ({ userId }) => {
   const [user, setUser] = useState(null);
    const [profileData, setProfileData] = useState({});
     const [isEditing, setIsEditing] = useState(false);
    const [error, setError] = useState('');
    const [image, setImage] = useState(null);
   const [previewImage, setPreviewImage] = useState(null);

    const handleImageChange = (e) => {
      const file = e.target.files[0];
      setImage(file);
       if (file) {
          setPreviewImage(URL.createObjectURL(file));
      }
     console.log('Image selected:', file);
  };


   useEffect(() => {
        const fetchUserData = async () => {
           try {
                const response = await axios.get(`http://localhost:5000/api/users/${userId}`);
                setUser(response.data);
                 setProfileData(response.data || {});
                console.log('User profile data:', response.data);
            } catch (err) {
              setError('Failed to load user data.');
           }
       };
       if (userId) {
          fetchUserData();
       }
   }, [userId]);

    const handleChange = (e) => {
        const { name, value } = e.target;
       setProfileData((prevData) => ({
           ...prevData,
           [name]: value,
       }));
    };

   const handleEditClick = () => {
       setIsEditing(true);
    };
   const handleCancelEdit = () => {
      setIsEditing(false);
        setProfileData(user || {});
   };

   const handleSubmit = async (e) => {
      e.preventDefault();
       try {
            let profilePic = '';
           if (image) {
                 const formData = new FormData();
               formData.append('image', image);
              console.log('FormData being sent:', formData);
               console.log('Image File:', image);
                 const response = await axios.post('http://localhost:5000/api/upload', formData, {
                    headers: {
                         'Content-Type': 'multipart/form-data',
                    },
                });
              profilePic = response.data.imageUrl;
          }
         const response = await axios.put(`http://localhost:5000/api/users/${userId}`, { profile: { ...profileData, profilePic } });
          setUser(response.data);
         setIsEditing(false);
          setPreviewImage(null);
         setError('');
        } catch (err) {
            if (err.response) {
                setError(err.response.data.msg);
           } else {
                setError('An error occurred. Please try again.');
            }
      }
   };


     if (!user) return <p>Loading user profile...</p>;
      console.log('Data before render', user);

    return (
        <div className="user-profile-container">
            <div className="user-profile-card">
                 <div className="profile-header">
                     {user.profilePic ? (
                        <img src={user.profilePic} alt="Profile pic" className="profile-pic-small" />
                     ) : (
                         <div className='default-profile-pic'>{user.name?.charAt(0).toUpperCase()}</div>
                      )}
                       <h2>{user.name}'s Profile</h2>
                 </div>
                <div className="profile-pic-container">
                      {isEditing && (
                           <div className="image-upload">
                                <label htmlFor="image-upload" className="image-upload-label">
                                   Upload profile picture
                              </label>
                              <input type="file" id="image-upload" accept="image/*" onChange={handleImageChange} />
                         </div>
                    )}
                    {previewImage && <img src={previewImage} alt="Preview" className="preview-image" />}
                </div>
                 {isEditing ? (
                      <form onSubmit={handleSubmit}>
                          <label>
                               About Me:
                               <textarea name="aboutMe" value={profileData.aboutMe || ''} onChange={handleChange} />
                           </label>
                            <br />
                            <label>
                                Skills:
                              <input type="text" name="skills" value={profileData.skills || ''} onChange={handleChange} />
                            </label>
                           <br />
                            <label>
                              Year of Graduation:
                                 <input type="text" name="year_of_graduation" value={user?.year_of_graduation || ''} onChange={handleChange}  />
                             </label>
                             <br />
                            <label>
                                Qualification:
                                 <input type="text" name="qualification" value={user?.qualification || ''} onChange={handleChange} />
                            </label>
                           <br />
                             <label>
                                Current Job Role:
                                 <input type="text" name="current_job_role" value={user?.current_job_role || ''} onChange={handleChange} />
                             </label>
                           <br />
                             <label>
                                Current Working Organization:
                                 <input type="text" name="current_working_organization" value={user?.current_working_organization || ''} onChange={handleChange} />
                           </label>
                            <br />
                            <label>
                             Current Field of Work:
                                <input type="text" name="current_field_of_work" value={user?.current_field_of_work || ''} onChange={handleChange} />
                            </label>
                            <br />
                             <label>
                                 Current Location:
                                <input type="text" name="current_location" value={user?.current_location || ''} onChange={handleChange} />
                            </label>
                             <br />
                           <label>
                               Working Experience Years:
                                <input type="text" name="working_experience_years" value={user?.working_experience_years || ''} onChange={handleChange} />
                             </label>
                            <br />
                          <button type="submit">Save</button>
                            <button type="button" onClick={handleCancelEdit}>Cancel</button>
                           {error && <p style={{ color: 'red' }}>{error}</p>}
                    </form>
                   ) : (
                        <div>
                            {user?.aboutMe && <p><strong>About Me:</strong> {user.aboutMe}</p>}
                            {user?.skills && <p><strong>Skills:</strong> {user.skills}</p>}
                          <p><strong>Year of Graduation:</strong> {user?.year_of_graduation}</p>
                           <p><strong>Qualification:</strong> {user?.qualification}</p>
                            <p><strong>Current Job Role:</strong> {user?.current_job_role}</p>
                            <p><strong>Current Working Organization:</strong> {user?.current_working_organization}</p>
                            <p><strong>Current Field of Work:</strong> {user?.current_field_of_work}</p>
                            <p><strong>Current Location:</strong> {user?.current_location}</p>
                           <p><strong>Working Experience Years:</strong> {user?.working_experience_years}</p>
                         <button onClick={handleEditClick} className="edit-profile-btn">Edit Profile</button>
                       </div>
                   )}
            </div>
       </div>
     );
 };

 export default UserProfile;