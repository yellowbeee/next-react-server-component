import useServerComponent from '../hooks/useServerComponent'
import TodoList from './todoList/todoList'

function Home() {
  const App = useServerComponent('/api/app')
  return (
    <div>
      {/* {App} */}
      <TodoList></TodoList>
    </div>
  )
}
export default Home
