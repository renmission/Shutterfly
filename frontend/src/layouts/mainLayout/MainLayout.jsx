import { Outlet } from "react-router-dom"
import NavigationHeader from "../../components/Navigation/NavigationHeader"

const MainLayout = () => {
  return (
    <>
        <NavigationHeader />
        <Outlet />
    </>
  )
}

export default MainLayout