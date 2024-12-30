import React, { useState } from 'react';
import axios from 'axios';
import './CommentItem.css';
import CommentForm from './CommentForm';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faReply, faTrash } from '@fortawesome/free-solid-svg-icons';

const CommentItem = ({ comment }) => {
    const [showReply, setShowReply] = useState(false);
    const [replies, setReplies] = useState(comment.replies || []);
    const userId = localStorage.getItem('userId');
    const isAdmin = localStorage.getItem('isAdmin') === 'true';

   const handleReplyClick = () => {
      setShowReply(!showReply);
    };

    const handleCommentCreated = async (newComment) => {
       try {
            const response = await axios.get(`${process.env.REACT_APP_BASE_API_URL}/api/comments?postId=${comment._id}`);
            setReplies(response.data);
            setShowReply(false)
       } catch (error) {
           console.error('Error fetching replies:', error);
        }
    };

     const renderReplies = (replies) => {
        return replies.map((reply) => (
           <CommentItem key={reply._id} comment={reply}  />
      ));
   };


    return (
         <li key={comment._id} className='comment-item'>
            <div className='comment-header'>
                {comment.user && (
                     <div className='default-profile-pic-comment'>{comment.user.name?.charAt(0).toUpperCase()}</div>
                  )}
                   <div className='comment-username'>{comment.user?.name}</div>
                  {(comment.user && (userId === comment.user._id || isAdmin)) && <button className="delete-comment-btn" onClick={handleDelete}><FontAwesomeIcon icon={faTrash} /></button>}
           </div>
           <p className="comment-text"> {comment.text}</p>
             {userId &&  <button className='reply-btn' onClick={handleReplyClick}><FontAwesomeIcon icon={faReply} /></button>}
            {showReply && (
                <div className="reply-section">
                   <CommentForm postId={comment._id} onCommentCreated={handleCommentCreated} parentCommentId={comment._id} />
               </div>
            )}
            {replies && replies.length > 0 && <ul className='comment-replies-list'>{renderReplies(replies)}</ul>}
        </li>
   );
};

 export default CommentItem;