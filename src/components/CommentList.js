import React from 'react';
import './CommentList.css';
import CommentItem from './CommentItem';

const CommentList = ({ comments }) => {
    const renderComments = (comments) => {
        return comments.map(comment => (
            <CommentItem key={comment._id} comment={comment} />
       ));
   }
   return (
        <div className='comment-list-container'>
            {comments && comments.length > 0 ? (
                <ul>
                    {renderComments(comments)}
              </ul>
           ) : (
               <p>No comments yet.</p>
           )}
        </div>
  );
};

export default CommentList;