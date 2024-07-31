import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

const Home = () => {
 const { currentUser } = useSelector((state) => state.user);
  return (
    <div className="bg-gray-100 flex items-center justify-center">
      <div className="flex flex-col md:flex-row items-center justify-center w-full max-w-6xl p-4">
       
        
        <div className="flex flex-col items-center md:items-start md:w-1/2 p-4">
          <header className="mb-4">
            <h1 className="text-blue-600 text-6xl md:text-6xl font-bold">Shutterfly</h1>
          </header>
          <main className="text-center md:text-left">
            <h2 className="text-2xl mb-4">Your Memories, Our Passion</h2>
            <p className="mb-8">
              Capture and cherish your special moments with Shutterfly. Create beautiful photo books, personalized gifts, and more.
            </p>
            <div className="flex space-x-4">
                {currentUser ? (
                    <Link to="/posts" className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700">
                        Create a Photo Book
                    </Link>
                ) : (
                    <Link to="/auth/signin" className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700">
                        Create a Photo Book
                    </Link>
                )}
            </div>
          </main>
        </div>

        <div className="md:w-1/2 p-4">
          <img
            src="https://images.pexels.com/photos/19097456/pexels-photo-19097456/free-photo-of-woman-in-headscarf-relaxing-over-lake-in-autumn.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
            alt="Shutterfly"
            className="w-full max-w-md rounded shadow-lg object-cover"
          />
        </div>
      </div>
    </div>
  );
}

export default Home;