import { FaHome, FaHeart } from 'react-icons/fa';
import { MdCamera } from 'react-icons/md';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

const NavigationHeader = () => {
  const { currentUser } = useSelector((state) => state.user);

  console.log(currentUser);
  return (
    <div className="bg-white border-b border-gray-300">
      <div className="flex justify-between items-center max-w-6xl mx-auto p-3">
        {/* Brand Icon */}
        <div className="flex items-center space-x-2">
          <MdCamera className="text-2xl text-black" />
          <Link to="/">
            <h1 className="text-2xl font-bold">Shutterfly</h1>
          </Link>
        </div>

        {/* Search Bar */}
        <div className="flex-grow mx-4">
          <input
            type="text"
            placeholder="Search"
            className="w-full p-2 border border-gray-300 rounded-md"
          />
        </div>

        {/* Navigation Icons */}
        <div className="flex space-x-4">
          <a href="/" className="text-black">
            <FaHome className="text-2xl" />
          </a>
          {currentUser ? (
            <span>
               <a href="/notifications" className="text-black">
              <FaHeart className="text-2xl" />
              </a>
              <Link to='/profile'>
                <img src={currentUser.profilePicture} alt='profile' className='h-7 w-7 rounded-full object-cover' />
              </Link>
            </span>
          ) : (
            <Link to='/signin'>
              <span>Sign In</span>
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default NavigationHeader;