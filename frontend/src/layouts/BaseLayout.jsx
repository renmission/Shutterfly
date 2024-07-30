import { Outlet } from "react-router-dom"
import Errors from "../components/Errors/Errors"
import Footer from "../components/Footer/Footer"

const BaseLayout = () => {
  return (
    <div className="bg-gray-100 min-h-screen">
        <Outlet />
        <Errors />
        <Footer />
    </div>
  )
}

export default BaseLayout