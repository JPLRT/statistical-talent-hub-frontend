import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Post.css';
import CommentList from './CommentList';
import CommentForm from './CommentForm';
import ReactMarkdown from 'react-markdown';

const Post = ({ post, onPostDeleted }) => {
    const [comments, setComments] = useState([]);
    const [showComments, setShowComments] = useState(false);
    const userId = localStorage.getItem('userId');
    const isAdmin = localStorage.getItem('isAdmin') === 'true';

    useEffect(() => {
        const fetchComments = async () => {
           try {
               const response = await axios.get(`${process.env.REACT_APP_BASE_API_URL}/api/comments?postId=${post._id}`);
                setComments(response.data);
             } catch (error) {
                  console.error('Error fetching comments:', error);
            }
        };
        if(showComments){
            fetchComments();
        }
   }, [post._id,showComments]);

    const handleCommentCreated = (newComment) => {
        setComments([...comments, newComment]);
    }

   const handleCommentClick = () => {
        setShowComments(!showComments);
   };

     const formatDateTime = (dateString) => {
        const date = new Date(dateString);
        const formattedDate = date.toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' });
        const formattedTime = date.toLocaleTimeString(undefined, { hour: 'numeric', minute: '2-digit' });
        return `${formattedDate} at ${formattedTime}`;
   }

  const handleDelete = async () => {
        try {
           await axios.delete(`${process.env.REACT_APP_BASE_API_URL}/api/posts/${post._id}`);
           onPostDeleted(post._id);
      } catch (error) {
          console.error('Error deleting post:', error);
       }
   };

   return (
        <div className="post-container">
            <div className="post-header">
                <div className='post-user-details'>
                    {post.user && (
                       <div className='default-profile-pic'>{post.user.name?.charAt(0).toUpperCase()}</div>
                     )}
                    <div className="user-name-tab" >{post.user?.name}</div>
              </div>
              {(post.user && (userId === post.user._id || isAdmin)) && (
                  <button className='delete-btn' onClick={handleDelete}><i className="fas fa-trash"></i></button>
                )}
            </div>
            <div className="post-content">
                  <ReactMarkdown children={post.text}  />
                  {post.imageUrl && <img src={post.imageUrl} alt="Post" className="post-image" />}
            </div>
            <div className='post-actions'>
                <button className='comment-btn' onClick={handleCommentClick}><i className="fas fa-comment"></i>Comment</button>
            </div>
          <div className='post-date'>
              {formatDateTime(post.createdAt)}
           </div>
           {showComments && (
             <div className="comment-section">
                   <CommentList comments={comments} />
                   {userId &&  <CommentForm postId={post._id}  onCommentCreated={handleCommentCreated} />}
               </div>
            )}
      </div>
    );
};

export default Post;