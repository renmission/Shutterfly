import { Route, Routes } from 'react-router-dom'
import PostsGrid from './PostsGrid/PostsGrid'
import PostsCreate from './PostCreate/PostsCreate'
import PostsDelete from './PostDelete/PostsDelete'

const Posts = () => {
  return (
    <Routes>
        <Route path="/" element={<PostsGrid />} />
        <Route path="/submit" element={<PostsCreate />} />
        <Route path="/:id" element={<PostsDelete />} />
    </Routes>
  )
}

export default Posts