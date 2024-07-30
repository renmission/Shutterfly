import { Link, Outlet, useNavigate } from "react-router-dom"
import PropTypes from 'prop-types';
import { useSelector } from "react-redux";
import { MdCamera } from "react-icons/md";


const AuthLayout = () => {
  const navigate = useNavigate();
  const { currentUser } = useSelector((state) => state.user);
  if (currentUser) {
    navigate('/');
  }

  return (
    <div className="flex min-h-screen items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
    <div className="w-full max-w-md">
      <div className="flex items-center justify-center">
        <MdCamera className="text-4xl text-black" />
        <Link to="/">
          <h1 className="text-4xl font-bold">Shutterfly</h1>
        </Link>
      </div>
      <Outlet />
    </div>
  </div>
  )
}

AuthLayout.propTypes = {
  user: PropTypes.object
}



export default AuthLayout