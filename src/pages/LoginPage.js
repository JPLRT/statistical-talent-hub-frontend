import React, { useState } from 'react';
import axios from 'axios';
import './Login.css'; // Import CSS file
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChartBar } from '@fortawesome/free-solid-svg-icons';

const Login = ({ onLogin }) => {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
 const handleSubmit = async (e) => {
      e.preventDefault();
    setLoading(true)
     try {
          const emailTrim = email.toLowerCase().trim();
          const response = await axios.post('http://localhost:5000/api/auth/login', { email: emailTrim });
         onLogin(response.data.userId);
        setError('');
    } catch (err) {
        if (err.response) {
             setError(err.response.data.msg);
          }
          else{
             setError('An error occurred. Please try again.');
          }
      }
     finally{
        setLoading(false)
      }
};
const capitalizeFirstLetter = (str) => {
  if(!str){
    return '';
  }
   return str.charAt(0).toUpperCase() + str.slice(1);
};

  return (
      <div className="login-container">
          <div className="login-card">
              <div className="welcome-text">
                  <div className="logo-container">
                       <FontAwesomeIcon icon={faChartBar} size="3x" className="login-logo" />
                    </div>
                  <h1 className="welcome-heading">Welcome</h1>
                  <div className="welcome-description-box">
                     <p className="welcome-description"> {capitalizeFirstLetter("A Virtual Space for Students and Alumni of the Department of Statistics, Presidency College (Autonomous), Chennai")}</p>
                   </div>
              </div>
              <form onSubmit={handleSubmit}>
                  <div className="form-group">
                      <label htmlFor="email">Email</label>
                      <input
                          type="email"
                          id="email"
                           placeholder="Your Email Address"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          required
                      />
                  </div>
                 <button type="submit" className="login-btn" disabled={loading}>
                     {loading ? 'Logging in...' : 'Login'}
                 </button>
                   {error && <p className="error-msg">{error}</p>}
              </form>
          </div>
      </div>
   );
};

export default Login;