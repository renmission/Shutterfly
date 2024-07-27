import { FaHome, FaHeart } from 'react-icons/fa';
import { MdCamera } from 'react-icons/md';

const NavigationHeader = () => {
  return (
    <div className="bg-white border-b border-gray-300">
      <div className="flex justify-between items-center max-w-6xl mx-auto p-3">
        {/* Brand Icon */}
        <div className="flex items-center space-x-2">
          <MdCamera className="text-2xl text-black" />
          <h1 className="text-2xl font-bold">Shutterfly</h1>
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
          <a href="/notifications" className="text-black">
            <FaHeart className="text-2xl" />
          </a>
          <a href="/login" className="text-black">
            Login
          </a>
        </div>
      </div>
    </div>
  );
};

export default NavigationHeader;