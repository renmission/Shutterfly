import { Route, Routes, useNavigate } from 'react-router-dom'
import PostsGrid from './PostsGrid/PostsGrid'
import PostsCreate from './PostCreate/PostsCreate'
import { useEffect } from "react";
import { useSelector } from "react-redux";
import PostDetails from './PostDetails/PostDetails';

const Posts = () => {
  const { currentUser } = useSelector((state) => state.user);
  const navigate = useNavigate();
  useEffect(() => {
    if (!currentUser) {
      navigate('/auth/signin');
    }
  }, [currentUser, navigate]);

  return (
    <Routes>
        <Route path="/" element={<PostsGrid />} />
        <Route path="/:id" element={<PostDetails />} />
        <Route path="/submit" element={<PostsCreate />} />
    </Routes>
  )
}

export default Posts