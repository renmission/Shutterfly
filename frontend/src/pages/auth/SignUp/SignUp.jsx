import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

const SignUp = () => {
  const [formData, setFormData] = useState({});
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(false);
    try {
      const response = await fetch('/api/v1/auth/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      const data = await response.json();
      setLoading(false);
      if (data.success === false) {
        setError(true);
        return;
      }
      navigate('/');
    } catch (error) {
      setLoading(false);
      setError(true);
    }
  };
  return (
    <div  className='p-3 max-w-lg mx-auto'>
      <h2 className='text-xl text-center text-neutral-700 mb-7'>Join us today and create your account!</h2>
      <form className='flex flex-col gap-4' onSubmit={handleSubmit}>
        <input type='text' placeholder='Username' id='username' className='bg-slate-200 p-3 rounded-lg' onChange={handleChange} />
        <input type='email' placeholder='Email' id='email' className='bg-slate-200 p-3 rounded-lg' onChange={handleChange} />
        <input type='password' placeholder='Password' id='password' className='bg-slate-200 p-3 rounded-lg' onChange={handleChange} />
        <button type='submit' disabled={loading} className='bg-slate-900 text-white p-3 rounded-lg uppercase'>
          { loading ? 'Loading...' : 'Sign Up' }
        </button>
      </form>
      
      <div className='flex gap-2 mt-5'>
        <p>Have an account?</p>
        <Link to="/auth/signin">
          <span className='text-blue-500'>Sign In</span>
        </Link>
      </div>
      <p className='text-red-500 mt-5'>{error && 'Something went wrong'}</p>
    </div>
  )
}

export default SignUp