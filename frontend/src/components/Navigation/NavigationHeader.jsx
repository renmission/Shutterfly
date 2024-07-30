import { useEffect, useRef, useState } from 'react';
import { FaHeart } from 'react-icons/fa';
import { MdCamera } from 'react-icons/md';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { signOut } from '../../app/users/userSlice';

const NavigationHeader = () => {
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const { currentUser } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const dropdownRef = useRef(null);

  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setDropdownVisible(false);
    }
  };

  useEffect(() => {
    if (dropdownVisible) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [dropdownVisible]);

  const toggleDropdown = () => {
    setDropdownVisible(!dropdownVisible);
  };

  const handleSignOut = async () => {
    try {
      await fetch('/api/v1/auth/signout');
      dispatch(signOut());
      navigate('/auth/signin');
    } catch (error) {
      console.log('Error signing out', error);
    }
  };

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
        <div className="flex items-center space-x-4">
          {currentUser ? (
           <div className="relative flex items-center space-x-4">
           <Link to="users/likes" className="text-black hover:text-gray-700">
             <FaHeart className="text-2xl" />
           </Link>
           <div className="relative" ref={dropdownRef}>
              <img
                src={currentUser.data.profilePicture}
                alt="profile"
                className="h-8 w-8 rounded-full object-cover cursor-pointer"
                onClick={toggleDropdown}
              />
              {dropdownVisible && (
                <div className="absolute right-0 mt-2 w-32 bg-white border border-gray-200 rounded-md shadow-lg">
                  <Link
                    to="users/profile"
                    className="block w-full text-left px-4 py-2 text-black hover:bg-gray-100"
                  >
                    Profile
                  </Link>
                  <button
                    onClick={handleSignOut}
                    className="block w-full text-left px-4 py-2 text-black hover:bg-gray-100"
                  >
                    Sign Out
                  </button>
                </div>
              )}
            </div>
         </div>
          ) : (
            <Link to="auth/signin" className="text-black hover:text-gray-700">
              <span>Sign In</span>
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default NavigationHeader;