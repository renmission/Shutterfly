import { Route, Routes } from 'react-router-dom'
import Profile from './profile/Profile'
import Likes from './likes/Likes'

const Users = () => {
  return (
    <Routes>
        <Route path="/profile" element={<Profile />} />
        <Route path="/likes" element={<Likes />} />
    </Routes>
  )
}

export default Users