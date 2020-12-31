import React, {useState, useEffect, useRef} from 'react'
import style from './todoList.module.css'

let statusFlag = false
function TodoList() {
  const [inputValue, setInputValue] = useState('') //input的值
  const inputEle = useRef(null)
  const [list, setList] = useState([]) //代办列表数据
  // const [statusFlag, setStatusFlag] = useState()
  let inputVal = ''
  // useEffect(() => {
  //   // console.log(inputEle.current.value, 'aaaa')
  //   inputEle.current = inputVal
  //   console.log(inputEle)
  // }, [inputVal])

  //监听input
  function changeInput(e) {
    setInputValue(e.target.value)
  }

  //回车添加数据
  function handleKeyDown(event) {
    let newList = [...list]
    let inputVal = inputValue.replace(/(^\s*)|(\s*$)/g, '')
    if (event.keyCode == '13') {
      if (inputVal == '' || inputVal == null) {
        return
      }
      newList.push({text: inputValue.trim(), status: 0})
      setList(newList)
      setInputValue('')
    }
  }

  //删除单个列表元素
  function handleDel(index) {
    let newList = [...list]
    newList.splice(index, 1)
    setList(newList)
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
      {list.length > 0 && (
        <ul className={style.todoUl}>
          {list.map((item, index) => {
            return (
              <li key={index}>
                <span
                  className={`${style.checkBox} ${item.status && style.checked}`}
                  onClick={changeChecked.bind(this, index)}></span>
                <span className={style.text}>{item.text}</span>
                <span className={style.delButton} onClick={handleDel.bind(this, index)}></span>
              </li>
            )
          })}
        </ul>
      )}
      {list.length > 0 && statusFlag && (
        <div className={style.clearAll} onClick={clearChecked}>
          clear data
        </div>
      )}
    </div>
  )
}
export default TodoList
