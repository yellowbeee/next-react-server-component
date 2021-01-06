import React, {useState, useRef, useEffect, useCallback} from 'react'
import style from './index.module.css'
import useServerComponent from '../../hooks/useServerComponent'

function TodoContent() {
  // todo list component
  const [TodoList, fetchTodoList] = useServerComponent('/api/serverComponents/todoList?size=10')
  // todo list data
  const [todos, todosAction] = useState([])
  // complete all
  const [isCompleteAll, isCompleteAllAction] = useState(false)
  // input ref
  const inputEle = useRef(null)

  //回车添加数据
  const handleKeyDown = async event => {
    const inputValue = inputEle.current.value
    let inputVal = inputValue.replace(/(^\s*)|(\s*$)/g, '')
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
    // completeIdsAction(isCompleteAll ? [] : todos.map(todo => todo.id))
    if (isCompleteAll) {
      todos.map((item, index) => {
        item.status = 0
      })
    } else {
      todos.map((item, index) => {
        item.status = 1
      })
    }
    const response = await fetchUpgradeTodo([...todos])
    fetchTodoList()
  }

  // list change
  const onTodoListChange = useCallback(list => {
    todosAction(list.slice(0))
  }, [])

  // onClick complete some one
  const onComplete = async index => {
    todos[index].status = todos[index].status == 1 ? 0 : 1
    const response = await fetchUpgradeTodo([todos[index]])
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
    const response = await fetchDeleteTodo([...todos])
    // upgrade list
    fetchTodoList()
  }

  useEffect(() => {
    isCompleteAllAction(todos.every(item => item.status == 1))
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

      {todos.length > 0 && isCompleteAll && (
        <div className={style.clearAll} onClick={onDeleteAll}>
          clear data
        </div>
      )}
    </div>
  )
}
export default TodoContent
