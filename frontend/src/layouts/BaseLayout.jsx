import { Outlet } from "react-router-dom"
import Errors from "../components/Errors/Errors"

const BaseLayout = () => {
  return (
    <>
        <Outlet />
        <Errors />
    </>
  )
}

export default BaseLayout