import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import PostsPreview from "../../../components/Posts/PostsPreview";
import Button from "../../../components/Button/Button";

const PostsGrid = () => {
  const [posts, setPosts] = useState([]);
  const navigate = useNavigate();

  const fetchPosts = async () => {
    const response = await fetch("/api/v1/posts");
    const data = await response.json();
    setPosts(data);
  }

  useEffect(() => {
    fetchPosts();
  }, []);

  const handleDelete = async (id) => {
    try {
      const res = await fetch(`/api/v1/posts/${id}`, {
        method: 'DELETE'
      });

      if (!res.ok) {
        throw new Error('Failed to delete post');
      }

      setPosts((prevPosts) => prevPosts.filter((post) => post._id !== id));
    } catch (error) {
      console.log(error);
      
    }
  };

  const handleCreatePost = () => {
    navigate('/posts/submit');
  };

  return (
    <div className="max-w-6xl mx-auto mt-5 p-5">
      <div className="flex flex-col gap-5">
        <div className="flex justify-end mb-4">
          <Button 
            text="Create Post" 
            onClick={handleCreatePost} 
            className="px-6 py-3 bg-gradient-to-r from-blue-500 to-blue-700 text-white rounded shadow-lg hover:from-blue-600 hover:to-blue-800 transition duration-300"
          />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {
          posts.map((post) => (
            <PostsPreview
              key={post._id}
              {...post}
              onDelete={handleDelete}
            />
          ))
        }
        </div>
      </div>
     
    </div>
  )
}

export default PostsGrid