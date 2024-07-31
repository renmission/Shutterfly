import { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getDownloadURL, getStorage, ref, uploadBytesResumable } from 'firebase/storage';
import { app } from '../../../firebase';
import { 
  updateUserFail, 
  updateUserStart, 
  updateUserSuccess,
 } from '../../../app/users/userSlice';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Profile = () => {
  const [image, setImage] = useState(undefined);
  const [imagePercent, setImagePercent] = useState(0);
  const [imageError, setImageError] = useState(null);
  const [formData, setFormData] = useState({});
  const [updateSuccess, setUpdateSuccess] = useState(false);
  const fileRef = useRef(null);
  const { currentUser, loading, error } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (!currentUser) {
      navigate('/auth/signin');
    }
  }, [currentUser, navigate]);

  useEffect(() => {
    if (image) {
      handleFileUpload(image);
    }
  }, [image]);

  if (!currentUser) {
    return <div>Loading...</div>
  }

  const handleFileUpload = async (file) => {
    const storage = getStorage(app);
    const fileName = new Date().getTime() + '-' + file.name;
    const storageRef = ref(storage, fileName);
    const uploadTask = uploadBytesResumable(storageRef, file);
    uploadTask.on('state_changed', snapshot => {
      const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
      setImagePercent(Math.round(progress));
    }, () => {
      setImageError(true);
    }, () => {
      getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
        setFormData({ ...formData, profilePicture: downloadURL });
      });
    });
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  console.log(formData);

  console.log(currentUser.data);


  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      dispatch(updateUserStart());
      const res = await axios.put(`/api/v1/users/update/${currentUser.data._id}`, formData, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      const data = res.data;
      if (data.success === false) {
        dispatch(updateUserFail(data));
        return;
      }
      dispatch(updateUserSuccess(data));
      setUpdateSuccess(true);
    } catch (error) {
      dispatch(updateUserFail(error));
    }
  };

  

  return (
    <div className='px-3 max-w-lg mx-auto'>
      <h1 className="text-3xl font-semibold text-center my-7">Profile</h1>
      <form onSubmit={handleSubmit} className="flex flex-col items-center gap-4 w-full mx-auto">
        <input 
          type="file" 
          className="hidden" 
          id="profilePicture" 
          ref={fileRef} 
          accept='image/*' 
          onChange={e => setImage(e.target.files[0])} 
        />
        <img src={formData.profilePicture || currentUser?.data?.profilePicture} onClick={() => fileRef.current.click()} alt="avatar" className="rounded-full w-24 h-24 cursor-pointer object-cover self-center" />
        
        <div className='text-sm self-center'>
          { imageError ? (
            <span className='text-red-700'>
              Error uploading image (file size must be less than 2MB)
            </span>
          ) : imagePercent > 0 && imagePercent < 100 ? (
            <span className='text-slate-700'>
              {`Uploading ${imagePercent}%`}
            </span>
          ) : imagePercent === 100 ? (
            <span className='text-green-700'>Image Uploaded Successfully</span>
          ) : (
            ''
          )}
        </div>

        <label htmlFor='firstName' className='w-full'>
          <input 
            type='text' 
            placeholder='FirstName' 
            id='firstName' 
            className='bg-slate-200 p-3 rounded-lg w-full my-3' 
            defaultValue={currentUser.data.firstName}  
            onChange={handleChange} 
          />
        </label>
        <label htmlFor='lastName' className='w-full'>
          <input 
            type='text' 
            placeholder='LastName' 
            id='lastName' 
            className='bg-slate-200 p-3 rounded-lg w-full my-3' 
            defaultValue={currentUser.data.lastName}  
            onChange={handleChange} 
          />
        </label>
        <label htmlFor='email' className='w-full'>
          <input 
            type='email' 
            placeholder='Email' 
            id='email' className='bg-slate-200 p-3 rounded-lg w-full my-3' 
            defaultValue={currentUser.data.email}
            onChange={handleChange} 
          />
        </label>
        <label htmlFor='password' className='w-full'>
          <input 
            type='password' 
            placeholder='Password' 
            id='password' className='bg-slate-200 p-3 rounded-lg w-full my-3' 
            onChange={handleChange} 
          />
        </label>
        <button type='submit' className='bg-slate-900 text-white p-3 rounded-lg uppercase w-full my-3 hover:opacity-95 disabled:opacity-80'>
          {loading ? 'Loading...' : 'Update'}
        </button>
      </form>
      <p className='text-red-500 mt-5'>{error && 'Something went wrong'}</p>
      <p className='text-green-500 mt-5'>{updateSuccess && 'Profile Updated Successfully'}</p>
    </div>
  );
};

export default Profile;