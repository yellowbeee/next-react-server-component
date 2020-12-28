import useServerComponent from '../hooks/useServerComponent'

function Home({ stars }) {
  const Main = useServerComponent('api/react')

  return <div className="container">{Main && Main}</div>
}

export default Home
