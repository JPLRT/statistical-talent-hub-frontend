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
   const [userId] = useState(localStorage.getItem('userId'));
   useEffect(() => {
      const fetchPosts = async () => {
          try {
              const response = await axios.get(`${process.env.REACT_APP_BASE_API_URL}/api/posts`);
                 setPosts(response.data);
            } catch (error) {
                console.error('Error fetching posts:', error);
          }
      };

     fetchPosts();
  }, []);


const handlePostCreated = (newPost) => {
      console.log('New Post being added to state with data:', newPost);
      setPosts([newPost, ...posts]);
    };
  const handlePostDeleted = (postId) => {
       console.log('Post deleted from state with id', postId)
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