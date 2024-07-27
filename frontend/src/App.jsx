import { RouterProvider } from "react-router-dom"
import ErrorBoundery from "./utils/ErrorBoundery"
import router from "./router"

const App = () => {
  return (
    <ErrorBoundery>
      <RouterProvider router={router} />
    </ErrorBoundery>
  )
}

export default App