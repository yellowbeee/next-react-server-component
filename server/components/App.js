export default function App({ selectedId, isEditing, searchText }) {
  return (
    <div className="main">
      <img
        src="/img/logo.svg"
        style={{ width: 200, margin: '60px auto 30px', display: 'block' }}
      />
      <div style={{ textAlign: 'center', fontSize: '24px', fontWeight: 500 }}>
        next-react-server-component
      </div>
    </div>
  )
}
