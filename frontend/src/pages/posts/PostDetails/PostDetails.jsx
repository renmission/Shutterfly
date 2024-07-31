import PropTypes from 'prop-types'
import { useDispatch, useSelector } from 'react-redux';
import { fetchPostsFail, fetchPostsStart, fetchPostsSuccess } from '../../../app/posts/postSlice';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';

const PostDetails = () => {
    const { id } = useParams();
    const { posts, loading, error } = useSelector((state) => state.post);
    const dispatch = useDispatch();

    const fetchPost = async () => {
        dispatch(fetchPostsStart());
        try {
            const response = await fetch(`/api/v1/posts/${id}`);
            const data = await response.json();
            dispatch(fetchPostsSuccess(data));
        } catch (error) {
            dispatch(fetchPostsFail(error.message));
        }
    }

    useEffect(() => {
        fetchPost();
    }, [dispatch]);

    console.log(posts);



    return (
        <div className="max-w-2xl mx-auto p-6 rounded-lg mt-5 text-center shadow-lg bg-white">
        {loading && <p className="text-blue-500 text-start text-xl font-semibold mt-4 mb-4">Loading...</p>}
        {error && <p className="text-red-500 text-center text-xl font-semibold mt-4">{error}</p>}
        <img 
            src={posts.imageUrl} 
            alt="profile" 
            className="w-96 h-96 mx-auto object-cover rounded-lg border-2 border-gray-200 hover:shadow-md transition-shadow duration-300" 
        />
        
        <h1 className="text-4xl font-bold mt-6 text-gray-900">{posts.title}</h1>
        <div className="flex justify-center items-center mt-6 mb-10 space-x-4">
            <img 
                src={posts.userId?.profilePicture} 
                alt="profile" 
                className="w-10 h-10 object-cover rounded-full border-2 border-gray-200 hover:shadow-md transition-shadow duration-300" 
            />
            <span className="text-gray-600 font-medium">{posts.userId?.firstName} {posts.userId?.lastName}</span>
        </div>
        <p className="text-lg mt-2 text-gray-700 leading-relaxed">{posts.content}</p>
    </div>
    
    )
}

PostDetails.propTypes = {
    posts: PropTypes.shape({
        title: PropTypes.string.isRequired,
        content: PropTypes.string.isRequired,
        imageUrl: PropTypes.string.isRequired,
    }),
}

export default PostDetails