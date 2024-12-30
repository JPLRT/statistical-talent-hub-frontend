import React, { useState } from 'react';
import axios from 'axios';
import './Login.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChartBar } from '@fortawesome/free-solid-svg-icons';

const Login = ({ onLogin }) => {
    // ... other login logic ...

    return (
        <div className="login-container">
            <div className="login-card">
                <div className="welcome-text">
                    <div className="logo-container">
                         <FontAwesomeIcon icon={faChartBar} size="3x" className="login-logo" />
                     </div>
                    <h1 className="welcome-heading">Welcome</h1>
                    // ... other content ...
                </div>
             // ... rest of form ...
         </div>
    </div>
    );
};
export default Login;