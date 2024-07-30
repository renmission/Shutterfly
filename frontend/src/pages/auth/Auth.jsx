import { Outlet, Route, Routes } from 'react-router-dom'
import SignIn from './SignIn/SignIn'
import SignUp from './SignUp/SignUp'

const Auth = () => {
  return (
    <Routes>
       <Route path='/' element={<Outlet />} >
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
       </Route>
    </Routes>
  )
}

export default Auth