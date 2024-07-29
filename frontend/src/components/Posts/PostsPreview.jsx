import propTypes from 'prop-types';
import { RiDeleteBin5Fill } from 'react-icons/ri';

const PostsPreview = ({ _id: id, title, content, imageUrl, user, onDelete }) => {
  const { fullName, image: userImage } = user || {};
  
  return (
    <div className='border border-gray-300 rounded-md p-4'>
      {imageUrl && (
        <img src={imageUrl} alt={title} className='w-full h-48 object-cover rounded-md mb-4' />
      )}
      <h2 className='text-xl font-bold mb-2'>{title}</h2>
      <p className='text-gray-700 mb-4'>{content}</p>
      <div className='flex items-center justify-between'>
        <div className='flex items-center mt-4'>
          {userImage ? (
            <img 
              src={userImage} 
              alt={fullName} 
              className='w-8 h-8 rounded-full mr-3' 
            />
          ) : (
            <img src='https://img.freepik.com/free-photo/handsome-young-man-with-new-stylish-haircut_176420-19637.jpg?w=1380&t=st=1722226812~exp=1722227412~hmac=fd039c396c125541c96b4ac5d0ba42fa0ab6b4c24452859709410f508c8b822f' alt='User Profile' className='w-8 h-8 rounded-full mr-3 object-cover' />
          )}
          <span className='text-gray-800 font-medium'>{fullName || 'Ren Mission'}</span>
        </div>
        <button className='mt-4' onClick={() => onDelete(id)}>
          <RiDeleteBin5Fill className='w-8 h-8 text-red-500 cursor-pointer hover:animate-zoomIn'/>
        </button>

      </div>
    </div>
  )
}

PostsPreview.propTypes = {
  _id: propTypes.string,
  title: propTypes.string,
  content: propTypes.string,
  imageUrl: propTypes.string,
  user: propTypes.shape({
    fullName: propTypes.string,
    image: propTypes.string,
  }),
  onDelete: propTypes.func,
}

export default PostsPreview