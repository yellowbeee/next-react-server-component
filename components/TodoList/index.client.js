import HocClient from '../HocClient'
import style from './index.module.css'
import React, {useState, useEffect} from 'react'

let statusFlag = false
function TodoList({list, handleDel, init, changeStatus}) {
  const [selectList, setSelectList] = useState([]) //选中的数组
  init(list)
  //单个选中 取消
  function changeChecked(item) {
    if (selectList.includes(item.id)) {
      let arr = selectList.filter(v => v != item.id)
      setSelectList([...arr])
    } else {
      selectList.push(item.id)
      setSelectList([...selectList])
    }
    //判断是否全部选中
    if (list.length == selectList.length) {
      statusFlag = true
      changeStatus(statusFlag)
    } else {
      statusFlag = false
      changeStatus(statusFlag)
    }
  }

  //删除单个列表元素
  // function handleDel(item) {
  //   // let index = selectList.findIndex(v => v.id == item.id)
  //   // selectList.splice(index, 1)
  //   // setSelectList([...selectList])
  //   console.log(delList)
  //   delList.splice(0, 1)
  //   console.log(delList, 'a', list)
  //   // setDelList([...delList])
  // }

  return (
    list.length > 0 && (
      <ul className={style.todoUl}>
        {list.map((item, index) => (
          <li key={index}>
            <span
              className={`${style.checkBox} ${selectList.includes(item.id) && style.checked}`}
              onClick={changeChecked.bind(this, item)}></span>
            <span className={style.text}>{item.name}</span>
            <span className={style.delButton} onClick={() => handleDel(item)}></span>
          </li>
        ))}
      </ul>
    )
  )
}

export default TodoList
