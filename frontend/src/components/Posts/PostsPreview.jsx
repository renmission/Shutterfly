import propTypes from 'prop-types';
import { RiDeleteBin5Fill } from 'react-icons/ri';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

const PostsPreview = ({ _id: id, title, content, imageUrl, userId, onDelete }) => {
  const { currentUser } = useSelector((state) => state.user);
  const { firstName, lastName, profilePicture } = userId || {};
  
  return (
    <div className='border border-gray-300 rounded-md p-4'>
      <Link to={`/posts/${id}`}>
        {imageUrl && (
          <img src={imageUrl} alt={title} className='w-full h-48 object-cover rounded-md mb-4' />
        )}
        <h2 className='text-xl font-bold mb-2'>{title}</h2>
      </Link>
      <p className='text-gray-700 mb-4'>{content}</p>
      <div className='flex items-center justify-between'>
        <div className='flex items-center mt-4'>
          <img 
              src={profilePicture} 
              alt={`${firstName} ${lastName}`} 
              className='w-8 h-8 rounded-full mr-1' 
            />
          <span className='text-gray-800 font-medium'>{`${firstName} ${lastName}` || ''}</span>
        </div>

        {currentUser?.data?._id === userId?._id && (
          <button className='mt-4' onClick={() => onDelete(id)}>
          <RiDeleteBin5Fill className='w-8 h-8 text-red-500 cursor-pointer hover:animate-zoomIn'/>
        </button>

        )}        
      </div>
    </div>
  )
}

PostsPreview.propTypes = {
  _id: propTypes.string,
  title: propTypes.string,
  content: propTypes.string,
  imageUrl: propTypes.string,
  userId: propTypes.shape({
    _id: propTypes.string,
    firstName: propTypes.string,
    lastName: propTypes.string,
    profilePicture: propTypes.string,
  }),
  onDelete: propTypes.func,
}

export default PostsPreview