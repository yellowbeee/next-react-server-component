import useServerComponent from '../hooks/useServerComponent'
import TodoList from './todoList/todoList'

function Home({stars}) {
  const Main = useServerComponent('api/react')

  return (
    <div className="container">
      {Main && Main}
      <TodoList></TodoList>
    </div>
  )
}

export default Home
