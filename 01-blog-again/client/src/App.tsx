import PostCreate from './posts/PostCreate'
import PostList from './posts/PostList'

function App() {

  return (
    <div className="container">
      <h1>Create App</h1>
      <PostCreate />
      <hr />
      <PostList />
    </div>
  )
}

export default App
