import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';
// import OAuth from '../components/OAuth';
import { signInStart, signInFail, signInSuccess } from '../../../app/users/userSlice';

const SignIn = () => {
  const [formData, setFormData] = useState({});
  const { loading, error } = useSelector((state) => state.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      dispatch(signInStart());

      const response = await fetch('/api/v1/auth/signin', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      
      if (data.success === false) {
        dispatch(signInFail(data));
        return;
      }

      dispatch(signInSuccess(data));
      navigate('/');
    } catch (error) {
      dispatch(signInFail(error));
    }
  };

  return (
    <div  className='p-3 max-w-lg mx-auto'>
      <h2 className='text-xl text-center text-neutral-700 mb-7'>Welcome back! Please log in</h2>
      <form className='flex flex-col gap-4' onSubmit={handleSubmit}>
        <input type='email' placeholder='Email' id='email' className='bg-slate-200 p-3 rounded-lg' onChange={handleChange} />
        <input type='password' placeholder='Password' id='password' className='bg-slate-200 p-3 rounded-lg' onChange={handleChange} />
        <button type='submit' disabled={loading} className='bg-slate-900 text-white p-3 rounded-lg uppercase'>
          { loading ? 'Loading...' : 'Sign In' }
        </button>
      </form>
      {/* <OAuth /> */}
      <div className='flex gap-2 mt-5'>
        <p>Don&#39;t have an account?</p>
        <Link to="/auth/signup">
          <span className='text-blue-500'>Sign Up</span>
        </Link>
      </div>
      <p className='text-red-500 mt-5'>{error ? (typeof error === 'object' ? error.message : error) || 'Something went wrong' : ''}</p>
    </div>
  )
}

export default SignIn