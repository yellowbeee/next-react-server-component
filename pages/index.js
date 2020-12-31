import useServerComponent from '../hooks/useServerComponent'

function Home() {
  const App = useServerComponent('/api/app')
  const TodoList = useServerComponent('/api/todoList?size=10')

  return (
    <div>
      {App}
      {TodoList && TodoList}
    </div>
  )
}

export default Home
