import React, { useState } from 'react';
import axios from 'axios';
import './CommentForm.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPaperPlane } from '@fortawesome/free-solid-svg-icons';

const CommentForm = ({ postId, onCommentCreated, parentCommentId }) => {
    const [text, setText] = useState('');
    const userId = localStorage.getItem('userId');
    const [error, setError] = useState('');

   const handleSubmit = async (e) => {
     e.preventDefault();
      if(!userId){
            setError('User not logged in');
             return;
       }
        try {
            const response = await axios.post('http://localhost:5000/api/comments', { post:postId, user: userId, text, parentCommentId });
             onCommentCreated(response.data);
              setText('');
            setError('');
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
     <form onSubmit={handleSubmit} className='comment-form'>
            <textarea
                placeholder="Add a comment..."
                value={text}
                onChange={(e) => setText(e.target.value)}
               required
            />
          <button type="submit"><FontAwesomeIcon icon={faPaperPlane} /></button>
         {error && <p className="error-msg">{error}</p>}
       </form>
    );
};

export default CommentForm;