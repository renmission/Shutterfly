import { useEffect } from "react"
import axios from "axios";
import PostsPreview from "../../../components/Posts/PostsPreview";
import { useDispatch, useSelector } from "react-redux";
import { deletePostFail, deletePostStart, deletePostSuccess, fetchPostsFail, fetchPostsStart, fetchPostsSuccess } from "../../../app/posts/postSlice";

const MyPosts = () => {
  const { posts, loading, error } = useSelector((state) => state.post);
  const dispacth = useDispatch();

  const fetchPosts = async () => {
    dispacth(fetchPostsStart());
    try {
      const response = await fetch("/api/v1/posts/my-posts");
      const data = await response.json();
      dispacth(fetchPostsSuccess(data));
    } catch (error) {
      dispacth(fetchPostsFail(error.message));  
    }
  }

  useEffect(() => {
    fetchPosts();
  }, [dispacth]);

  const handleDelete = async (id) => {
    dispacth(deletePostStart());
    try {
      const res = await axios.delete(`/api/v1/posts/${id}`);
      if (!res.ok) {
        throw new Error('Failed to delete post');
      }
      dispacth(deletePostSuccess(id));
    } catch (error) {
      dispacth(deletePostFail(error.message));
      console.log(error);
      
    }
  };

  return (
    <div className="max-w-6xl mx-auto mt-5 p-5">
        <h1 className="text-3xl font-semibold text-center mb-6">My Posts</h1>
      { loading && <p className="text-blue-500 text-start text-xl font-semibold mt-4 mb-4">Loading...</p>}
        {posts.length > 0 ? (
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
        ) : (
          <p className="text-gray-500 text-center text-2xl font-semibold mt-4">No posts found</p>
        )}
       
       { error && <p className="text-red-500 text-center text-xl font-semibold mt-4">{error}</p>}
    </div>
  )
}

export default MyPosts