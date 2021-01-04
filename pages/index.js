import useServerComponent from '../hooks/useServerComponent'
import TodoContent from '../components/TodoCentent/index.client'
function Home() {
  const App = useServerComponent('/api/app')
  // const TodoList = useServerComponent('/api/todoList?size=10')

  return (
    <div>
      {/* {App} */}
      <TodoContent />
    </div>
  )
}
export default Home
