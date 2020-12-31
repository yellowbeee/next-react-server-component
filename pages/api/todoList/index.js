// import React from 'react'
import {HocComponentResponse} from '../../../server/render'
import HocClient from '../../../components/HocClient'

const TodoList = HocClient('./components/TodoList/index.client.js')

const TodoListContainer = ({request}) => {
  const {size, name} = request.query
  let list = new Array(Number(size) || 10).fill(0).map((item, key) => ({name: `todo${key + 1}`}))
  // filter
  if (name) list = list.filter(item => item.name.indexOf(name) >= 0)
  return <TodoList list={list} />
}

export default HocComponentResponse(TodoListContainer)
