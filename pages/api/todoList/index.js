import React from 'react'
import {HocComponentResponse} from '../../../server/render'

const TodoList = ({request, onClick}) => {
  const {size, name} = request.query
  let list = new Array(Number(size) || 10).fill(0).map((item, key) => ({name: `todo${key + 1}`}))
  // filter
  if (name) list = list.filter(item => item.name.indexOf(name) >= 0)

  return (
    <ul className="todoList">
      {list.map((item, key) => (
        <li key={key} className="todoList__item">
          {item.name}
        </li>
      ))}
    </ul>
  )
}

export default HocComponentResponse(TodoList)
