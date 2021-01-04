import HocClient from '../HocClient'
import style from './index.module.css'

function TodoList({list, changeChecked, handleDel}) {
  return (
    list.lenth && (
      <ul className={style.todoUl}>
        {list.map((item, index) => {
          return (
            <li key={index}>
              <span
                className={`${style.checkBox} ${item.status && style.checked}`}
                onClick={() => changeChecked(index)}></span>
              <span className={style.text}>{item.text}</span>
              <span className={style.delButton} onClick={() => handleDel(index)}></span>
            </li>
          )
        })}
      </ul>
    )
  )
}

export default TodoList
