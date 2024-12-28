import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Post from '../components/Post';
import PostForm from '../components/PostForm';
 import UserProfile from '../components/UserProfile';
 import CommunityMembers from '../components/CommunityMembers';
import {  Link ,Route,Routes} from 'react-router-dom';
import './Home.css';

const Home = () => {
 const [posts, setPosts] = useState([]);
  const [userId, setUserId] = useState(localStorage.getItem('userId'));
 const [isAdmin, setIsAdmin] = useState(localStorage.getItem('isAdmin') === 'true')

  useEffect(() => {
     const fetchPosts = async () => {
         try {
             const response = await axios.get('http://localhost:5000/api/posts');
              setPosts(response.data);
         } catch (error) {
             console.error('Error fetching posts:', error);
          }
     };
      const fetchUser = async () => {
         if(userId){
              try {
                 const response = await axios.get(`http://localhost:5000/api/users/${userId}`);
                      localStorage.setItem('isAdmin', response.data.isAdmin);
                      setIsAdmin(response.data.isAdmin);
                } catch (error) {
                    console.error('Error fetching user:', error);
                }
            }
      };
      fetchPosts();
      fetchUser();
  }, [userId]);

const handlePostCreated = (newPost) => {
    setPosts([newPost, ...posts]);
};
 const handlePostDeleted = (postId) => {
      setPosts(posts.filter(post => post._id !== postId));
  };


   return (
       <div className="home-container">
           <aside className="home-sidebar">
                {userId &&   <UserProfile userId={userId}/>}
                 <Link to="/members" className="community-link">Community Members</Link>
           </aside>
           <main className="home-main-content">
              <Routes>
                   <Route path="/" element={
                         userId ? (
                              <>
                                  <h2 className="feed-title">Feed</h2>
                                  <PostForm onPostCreated={handlePostCreated} />
                                 <div className="post-feed">
                                     {posts.map(post => (
                                         <Post key={post._id} post={post} onPostDeleted={handlePostDeleted} />
                                      ))}
                                </div>
                          </>
                        ) : (
                         <p>Please login to see the community</p>
                      )
                   } />
                      <Route path="/members" element={<CommunityMembers />} />
                </Routes>
             </main>
        </div>
     );
 };

 export default Home;