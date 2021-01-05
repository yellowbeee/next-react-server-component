import useServerComponent from '../hooks/useServerComponent'
import TodoContent from '../components/TodoCentent/index.client'
function Home() {
  // click each list item
  const onTabItem = item => {
    console.log(item)
  }

  return (
    <div>
      <TodoContent />
      {/* <div className="main">
        <img src="/img/logo.svg" style={{width: 200, margin: '60px auto 30px', display: 'block'}} />
        <div style={{textAlign: 'center', fontSize: '26px'}}>next-react-server-component</div>
      </div>
      <TodoList onClick={onTabItem} /> */}
    </div>
  )
}
export default Home
