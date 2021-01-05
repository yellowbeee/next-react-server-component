import React, {useState, useEffect, useRef} from 'react'
import style from './index.module.css'
import useServerComponent from '../../hooks/useServerComponent'
import 'whatwg-fetch'
let statusFlag = false
let listArry = []
function TodoContent() {
  const TodoList = useServerComponent('/api/serverComponents/todoList?size=10')
  const [inputValue, setInputValue] = useState('') //input的值
  const inputEle = useRef(null)
  const todoRef = useRef(null)
  const [list, setList] = useState([]) //代办列表数据
  // const [statusFlag, setStatusFlag] = useState()
  function init(list) {
    listArry = list
  }
  console.log(listArry, 'listArry')
  //回车添加数据
  function handleKeyDown(event) {
    let newList = [...list]
    let inputVal = inputValue.replace(/(^\s*)|(\s*$)/g, '')
    if (event.keyCode == '13') {
      if (inputVal == '' || inputVal == null) {
        return
      }
      newList.push({text: inputValue.trim(), status: 0})
      fetch(`/api/addTodo?name=${inputValue}`)
        .then(res => {
          console.log(res)
        })
        .catch(err => {
          console.log(err)
        })
      setList(newList)
      setInputValue('')
    }
  }

  //删除单个列表元素
  function handleDel(item) {
    let delList = []
    delList.push(item.id)
    fetch('/api/deleteTodo', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        ids: delList,
      }),
    }).then(res => {
      console.log(res)
    })
  }

  //单个选中 取消
  function changeChecked(index) {
    let newList = [...list]
    newList.forEach((v, i) => {
      if (i == index) {
        v.status = v.status == 1 ? 0 : 1
      }
    })
    //判断是否全部选中
    if (newList.every(item => item.status == 1)) {
      statusFlag = true
    } else {
      statusFlag = false
    }
    setList(newList)
  }

  //全选反选
  function selectAll() {
    statusFlag = false
    let newList = [...list]
    for (let i = 0; i < newList.length; i++) {
      if (newList[i].status == 0) {
        statusFlag = true
        break
      }
    }

    if (statusFlag) {
      newList.forEach((v, i) => {
        v.status = 1
      })
    } else {
      newList.forEach((v, i) => {
        v.status = 0
      })
    }
    setList(newList)
  }

  //清除所有选中数据
  function clearChecked() {
    let newList = [...list]
    newList = newList.filter(item => item.status != 1)
    setList(newList)
  }

  function changeStatus(flag) {
    statusFlag = flag
    // console.log(statusFlag, flag, listArry, '>>>>>>>>>>>>')
  }

  return (
    <div className={style.todoView}>
      <h1 className={style.title}>Todos</h1>
      <div className={style.inputBox}>
        <input
          type="text"
          className={style.todoInput}
          value={inputValue}
          ref={inputEle}
          placeholder="What needs to be done?"
          onChange={e => setInputValue(e.target.value)}
          onKeyDown={handleKeyDown}
        />
        {list.length > 0 && (
          <span className={`${style.toggleAll} ${statusFlag && style.toogleCheck}`} onClick={selectAll}></span>
        )}
      </div>
      {/* <TodoList list={list} changeChecked={changeChecked} handleDel={handleDel} /> */}
      <TodoList handleDel={handleDel} init={init} changeStatus={changeStatus} />
      {statusFlag}
      {listArry.length > 0 && statusFlag && (
        <div className={style.clearAll} onClick={clearChecked}>
          clear data
        </div>
      )}
    </div>
  )
}
export default TodoContent
