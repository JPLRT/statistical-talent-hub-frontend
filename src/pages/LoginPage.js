import React, { useState, useEffect } from 'react';
    import { useNavigate } from 'react-router-dom';
    import axios from 'axios';

    const LoginPage = () => {
    const [email, setEmail] = useState('');
    const [error, setError] = useState(null);
    const navigate = useNavigate();
     const [loginSuccess, setLoginSuccess] = useState(false)
        const handleLogin = async (event) => {
            event.preventDefault();

            try{
                console.log("Request config",{
                    url: '/api/auth/login',
                        method: 'POST',
                        data: {email}
                    })
            const res = await axios.post('/api/auth/login', {email})
             console.log("Response", res)
               console.log("Response data", res.data);
                if(res.status === 200 && res.data.message === "Login successful"){
                    console.log("Status 200 received");
                     console.log("LocalStorage before setting", localStorage.getItem('user'))
                    localStorage.setItem('user', email);
                     console.log("LocalStorage after setting", localStorage.getItem('user'))
                    setLoginSuccess(true)
                     console.log("Navigating to home page")
                }else{
                      setError("User not found, Contact admin to register")
                }
            }catch(err){
                setError("User not found, Contact admin to register")
                 console.log("Error in login", err.response)
            }
        };

        useEffect(()=> {
           if(loginSuccess){
                navigate('/home')
                console.log("Navigating to home page")
           }
        }, [loginSuccess, navigate])

    return (
        <div className="flex items-center justify-center h-screen bg-gray-100">
            <div className="bg-white p-8 rounded shadow-md w-96">
                <h1 className="text-2xl font-semibold mb-6 text-gray-800 text-center">
                Welcome to Statistical Talent Hub
                </h1>
                {error && <p style={{color: 'red'}}>{error}</p>}
            <form onSubmit={handleLogin}>
                <div className="mb-4">
                    <label
                    htmlFor="email"
                    className="block text-gray-700 text-sm font-bold mb-2"
                    >
                    Email
                    </label>
                <input
                    type="email"
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                />
            </div>
            <div className="flex items-center justify-center">
                <button
                    type="submit"
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                >
                    Login
                </button>
            </div>
        </form>
    </div>
        </div>
    );
    };

    export default LoginPage;