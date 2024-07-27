import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Posts from './pages/posts/Posts'

function App() {
  return (
   <Router>
      <Routes>
        {/* <Route path="/" element={<Home />} /> */}
        <Route path="/posts/*" element={<Posts />} />
      </Routes>
   </Router>
  )
}

export default App