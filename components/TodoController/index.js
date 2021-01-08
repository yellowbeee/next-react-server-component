import React, {useState, useRef, useEffect, useCallback} from 'react'
import style from './index.module.css'
import useServerComponent from '../../hooks/useServerComponent'

function TodoContent() {
  // todo list component
  const [TodoList, fetchTodoList] = useServerComponent('/api/serverComponents/todoList')
  // todo list data
  const [todos, todosAction] = useState([])
  // complete all
  const [isCompleteAll, isCompleteAllAction] = useState(false)
  // complete part
  const [isCompletePart, isCompletePartAction] = useState(false)
  // input ref
  const inputEle = useRef(null)

  //回车添加数据
  const handleKeyDown = async event => {
    const inputValue = inputEle.current.value
    let inputVal = inputValue.trim()
    if (event.keyCode == '13') {
      if (inputVal == '' || inputVal == null) {
        return
      }
      await fetch(`/api/addTodo?name=${inputValue}`)
      // clear input value
      inputEle.current.value = ''
      // upgrade list
      fetchTodoList()
    }
  }

  // fetch delete todo
  const fetchDeleteTodo = async ids => {
    return await fetch('/api/deleteTodo', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        ids,
      }),
    })
  }

  // fetch upstatus todo
  const fetchUpgradeTodo = async updates => {
    return await fetch('/api/upgradeTodo', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        updates,
      }),
    })
  }

  // revert todos
  const revertTodos = async () => {
    let selectAll = isCompleteAll
      ? todos.map(item => ({id: item.id, status: 0}))
      : todos.map(item => ({id: item.id, status: 1}))
    const response = await fetchUpgradeTodo([...selectAll])
    fetchTodoList()
  }

  // list change
  const onTodoListChange = useCallback(list => {
    todosAction(list.slice(0))
  }, [])

  // onClick complete some one
  const onComplete = async item => {
    let params = {id: item.id, status: item.status == 1 ? 0 : 1}
    const response = await fetchUpgradeTodo([params])
    fetchTodoList()
  }

  // onClick delete some one
  const onDelete = async id => {
    const response = await fetchDeleteTodo([id])
    // upgrade list
    fetchTodoList()
  }

  // onClick delete all
  const onDeleteAll = async id => {
    let selectId = []
    todos.map(item => item.status == 1 && selectId.push(item.id))
    const response = await fetchDeleteTodo(selectId)
    // upgrade list
    fetchTodoList()
  }

  useEffect(() => {
    isCompleteAllAction(todos.every(item => item.status == 1))
    isCompletePartAction(todos.some(item => item.status == 1))
  }, [todos])

  return (
    <div className={style.todoView}>
      <h1 className={style.title}>Todos</h1>
      <div className={style.inputBox}>
        <input
          type="text"
          className={style.todoInput}
          ref={inputEle}
          placeholder="What needs to be done?"
          onKeyDown={handleKeyDown}
        />
        {todos.length > 0 && (
          <span className={`${style.toggleAll} ${isCompleteAll && style.toogleCheck}`} onClick={revertTodos}></span>
        )}
      </div>

      <TodoList onComplete={onComplete} onDelete={onDelete} onChange={onTodoListChange} />

      {todos.length > 0 && isCompletePart && (
        <div className={style.clearAll} onClick={onDeleteAll}>
          Clear Completed
        </div>
      )}
    </div>
  )
}
export default TodoContent
