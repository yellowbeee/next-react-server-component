import useServerComponent from '../hooks/useServerComponent'

function Home() {
  const TodoList = useServerComponent('/api/todoList?size=10')

  return (
    <div>
      <div className="main">
        <img src="/img/logo.svg" style={{width: 200, margin: '60px auto 30px', display: 'block'}} />
        <div style={{textAlign: 'center', fontSize: '26px'}}>next-react-server-component</div>
      </div>
      {TodoList && TodoList}
    </div>
  )
}
export default Home
