import HocClient from '../HocClient'
import style from './index.module.css'

function TodoList({list}) {
  console.log(list, 'list')
  return (
    list.length > 0 && (
      <ul className={style.todoUl}>
        {list.map((item, index) => (
          <li key={index}>
            <span className={`${style.checkBox} ${item.status && style.checked}`}></span>
            <span className={style.text}>{item.name}</span>
            <span className={style.delButton}></span>
          </li>
        ))}
      </ul>
    )
  )
}

export default TodoList
