import React, { useState } from 'react';
import axios from 'axios';
import './PostForm.css';

const PostForm = ({ onPostCreated }) => {
    const [text, setText] = useState('');
    const [image, setImage] = useState(null);
    const [previewImage, setPreviewImage] = useState(null);
    const [error, setError] = useState('');
   const userId = localStorage.getItem('userId');

     const handleImageChange = (e) => {
          const file = e.target.files[0];
           setImage(file);
            if(file){
              setPreviewImage(URL.createObjectURL(file));
           }
         console.log('Image selected:', file);
    };

  const handleSubmit = async (e) => {
       e.preventDefault();
       if(!userId){
          setError('User not logged in');
           return;
         }
        try {
             let imageUrl = '';
             if (image) {
                 const formData = new FormData();
                 formData.append('image', image);
                  console.log('FormData being sent:', formData);
                   console.log('Image File:', image);
                 const response = await axios.post(`${process.env.REACT_APP_BASE_API_URL}/api/upload`, formData, {
                     headers: {
                        'Content-Type': 'multipart/form-data',
                    },
                 });
               imageUrl = response.data.imageUrl;
          }
            const response = await axios.post(`${process.env.REACT_APP_BASE_API_URL}/api/posts`, { user: userId, text, imageUrl });
           onPostCreated(response.data);
            setText('');
             setImage(null)
            setPreviewImage(null)
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
        <div className="post-form-container">
           <h2>Create a Post</h2>
            <form onSubmit={handleSubmit} className="post-form">
                 <textarea
                      placeholder="Write your post here..."
                      value={text}
                     onChange={(e) => setText(e.target.value)}
                      required
                  />
                <div className="image-upload">
                     <label htmlFor="image-upload" className="image-upload-label">Upload Image</label>
                    <input
                          type="file"
                          id="image-upload"
                          accept="image/*"
                          onChange={handleImageChange}
                    />
                 </div>
               {previewImage && <img src={previewImage} alt="Preview" className="preview-image" />}
                <button type="submit">Post</button>
                {error && <p className="error-msg">{error}</p>}
          </form>
        </div>
    );
 };

 export default PostForm;