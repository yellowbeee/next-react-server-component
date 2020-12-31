import HocClient from '../HocClient'

function TodoList({list}) {
  return (
    <ul className="todoList">
      {list.map((item, key) => (
        <li key={key} className="todoList__item" onClick={() => {}}>
          {item.name}
        </li>
      ))}
    </ul>
  )
}

export default TodoList
