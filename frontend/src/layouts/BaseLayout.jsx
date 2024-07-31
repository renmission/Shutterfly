import { Outlet } from "react-router-dom"
import Errors from "../components/Errors/Errors"

const BaseLayout = () => {
  return (
    <div className="bg-gray-100 min-h-screen">
            <Outlet />
            <Errors />
    </div>
  )
}

export default BaseLayout