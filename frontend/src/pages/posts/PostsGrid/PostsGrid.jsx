import { useEffect, useState } from "react"
import PostsPreview from "../../../components/Posts/PostsPreview";

const PostsGrid = () => {
  const [posts, setPosts] = useState([]);

  const fetchPosts = async () => {
    const response = await fetch("/api/posts");
    const data = await response.json();
    setPosts(data);
  }

  useEffect(() => {
    fetchPosts();
  }, []);

  const handleDelete = async (id) => {
    try {
      const res = await fetch(`/api/posts/${id}`, {
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

  return (
    <div className="max-w-6xl mx-auto mt-5">
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
  )
}

export default PostsGrid