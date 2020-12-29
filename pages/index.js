import useServerComponent from '../hooks/useServerComponent'

function Home() {
  const App = useServerComponent('/api/app')
  return <div>{App}</div>
}

export default Home
