import React, { useState } from 'react';
import axios from 'axios';

const UserForm = ({ onUserCreated }) => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        year_of_graduation: '',
        qualification: '',
        current_job_role: '',
        current_working_organization: '',
        current_field_of_work: '',
        current_location: '',
        working_experience_years: '',
    });
    const [error, setError] = useState('');
    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
           const response = await axios.post(`${process.env.REACT_APP_BASE_API_URL}/api/users`, formData);
            onUserCreated(response.data);
             setFormData({
                 name: '',
                 email: '',
                year_of_graduation: '',
                qualification: '',
                current_job_role: '',
                 current_working_organization: '',
                current_field_of_work: '',
               current_location: '',
                working_experience_years: '',
            })
       } catch (err) {
            if (err.response) {
                setError(err.response.data.msg);
             }
             else{
               setError('An error occurred. Please try again.');
            }
        }
    };

    return (
        <div className="user-form-container">
            <h2>Add New User Manually</h2>
            <form onSubmit={handleSubmit} className="user-form">
                 <label>Name</label>
                <input type="text" name="name" value={formData.name} onChange={handleChange} required />
                <label>Email</label>
               <input type="email" name="email" value={formData.email} onChange={handleChange} required />
                <label>Year of Graduation</label>
               <input type="text" name="year_of_graduation" value={formData.year_of_graduation} onChange={handleChange} />
                <label>Qualification</label>
                <input type="text" name="qualification" value={formData.qualification} onChange={handleChange} />
                <label>Current Job Role</label>
                  <input type="text" name="current_job_role" value={formData.current_job_role} onChange={handleChange} />
                 <label>Current Working Organization</label>
                 <input type="text" name="current_working_organization" value={formData.current_working_organization} onChange={handleChange} />
                 <label>Current Field of Work</label>
                    <input type="text" name="current_field_of_work" value={formData.current_field_of_work} onChange={handleChange} />
                 <label>Current Location</label>
                   <input type="text" name="current_location" value={formData.current_location} onChange={handleChange} />
                   <label>Working Experience Years</label>
                    <input type="number" name="working_experience_years" value={formData.working_experience_years} onChange={handleChange} />
                     <button type="submit">Add User</button>
                  {error && <p className="error-msg">{error}</p>}
           </form>
        </div>
      );
};

export default UserForm;