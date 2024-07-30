import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import InputBox from '../../../components/Input/Input';
import Button from '../../../components/Button/Button';

const PostsCreate = () => {
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    file: null,
  });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: files ? files[0] : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { title, content, file } = formData;
    if (!title || !content) {
      setError('Title and content are required');
      return;
    }

    try {
      const formData = new FormData();
      formData.append('file', file);
      formData.append('title', title);
      formData.append('content', content);
      await axios.post('/api/v1/posts', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      setFormData({ title: '', content: '', file: null });
      setError('');
      console.log('Post created successfully');
      navigate('/posts');
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white">
      <h2 className="text-2xl font-bold mb-4">Create Post</h2>
      {error && <p className="text-red-500 mb-4">{error}</p>}
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-gray-700">Title</label>
          <InputBox
            type='text'
            name='title'
            value={formData.title}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Content</label>
          <textarea
            name='content'
            value={formData.content}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Upload File</label>
          <InputBox
            type='file'
            name='file'
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <Button 
          text="Create Post"
          type="submit" 
          className="w-full px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-700" 
        />
      </form>
    </div>
  );
};

export default PostsCreate;