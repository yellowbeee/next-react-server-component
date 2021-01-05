function TodoList({list, onClick}) {
  return (
    list.length && (
      <ul className="todoList">
        {list.map((item, key) => (
          <li key={key} className="todoList__item" onClick={() => onClick(item)}>
            {item.name}
          </li>
        ))}
      </ul>
    )
  )
}

export default TodoList
