// import React from 'react'
import {HocComponentResponse} from '../../../server/render'
import HocClient from '../../../components/HocClient'
import db from '../../../server/db'

const TodoList = HocClient('./components/TodoList/index.client.js')

const TodoListContainers = ({request}) => {
  const {size, name} = request.query

  let list = db.get('todos').value()
  // filter
  // if (name) list = list.filter(item => item.name.indexOf(name) >= 0)
  return <TodoList list={list} />
}

export default HocComponentResponse(TodoListContainers)
