import { Route, Routes } from 'react-router-dom'
import SignIn from './auth/SignIn/SignIn'
import SignUp from './auth/SignUp/SignUp'

const Auth = () => {
  return (
    <Routes>
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
    </Routes>
  )
}

export default Auth