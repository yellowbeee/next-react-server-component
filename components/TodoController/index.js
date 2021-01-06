import React, {useState, useRef, useEffect} from 'react'
import style from './index.module.css'
import useServerComponent from '../../hooks/useServerComponent'

function TodoContent() {
  // todo list component
  const [TodoList, fetchTodoList] = useServerComponent('/api/serverComponents/todoList?size=10')
  // todo list data
  const [todos, todosAction] = useState([])
  // complete id
  const [completeIds, completeIdsAction] = useState([])
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

  // revert todos
  const revertTodos = () => {
    completeIdsAction(isCompleteAll ? [] : todos.map(todo => todo.id))
  }

  // list change
  const onTodoListChange = list => {
    todosAction(list.slice(0))
  }

  // onClick complete some one
  const onComplete = id => {
    const targetIndex = completeIds.findIndex(completeId => id === completeId)
    if (targetIndex >= 0) completeIds.splice(targetIndex, 1)
    else completeIds.push(id)
    completeIdsAction(completeIds.slice(0))
  }

  // onClick delete some one
  const onDelete = async id => {
    const response = await fetchDeleteTodo([id])
    // upgrade list
    fetchTodoList()
  }

  // listen complete all
  const onCompleteAll = is => {
    isCompleteAllAction(is)
  }

  useEffect(() => {
    isCompleteAllAction(todos.every(item => completeIds.some(select => select === item.id)))
  }, [todos, completeIds])

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

      <TodoList
        completeIds={completeIds}
        onComplete={onComplete}
        onDelete={onDelete}
        onCompleteAll={onCompleteAll}
        onChange={onTodoListChange}
      />

      {todos.length > 0 && isCompleteAll && <div className={style.clearAll}>clear data</div>}
    </div>
  )
}
export default TodoContent
