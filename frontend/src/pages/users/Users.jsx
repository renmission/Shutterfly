import { Route, Routes } from 'react-router-dom'
import Profile from './profile/Profile'
import MyPosts from './myPosts/MyPosts'

const Users = () => {
  return (
    <Routes>
        <Route path="/profile" element={<Profile />} />
        <Route path="/my-posts" element={<MyPosts />} />
    </Routes>
  )
}

export default Users