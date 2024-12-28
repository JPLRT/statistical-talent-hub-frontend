import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Layout = ({ children, loggedIn, isAdmin }) => {
    const navigate = useNavigate();
    const handleLogout = () => {
        localStorage.removeItem('userId');
        localStorage.removeItem('isAdmin');
        navigate('/');
    };

    return (
         <div className="app-container">
              <header className="app-header">
                  <div className="logo">Statistical Talent Hub</div>
                   <nav>
                        {loggedIn && (
                            <>
                               <Link to="/" className="nav-link">Home</Link>
                                {isAdmin && <Link to="/admin" className="nav-link">Admin</Link>}
                               <button onClick={handleLogout} className="nav-link logout-btn">Logout</button>
                           </>
                         )}
                   </nav>
               </header>
                <main className="app-main">
                      {children}
                </main>
                <aside className='app-sidebar'>
                     <p className='description-tab'>
                          A Virtual Space for Students and Alumni of the Department of Statistics.
                    </p>
                </aside>
            </div>
       );
   };

 export default Layout;