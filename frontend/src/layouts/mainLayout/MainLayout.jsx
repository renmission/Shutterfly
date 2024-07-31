import { Outlet } from "react-router-dom"
import NavigationHeader from "../../components/Navigation/NavigationHeader"
import Footer from "../../components/Footer/Footer"

const MainLayout = () => {
  return (
    <>
        <NavigationHeader />
        <Outlet />
        <Footer />
    </>
  )
}

export default MainLayout