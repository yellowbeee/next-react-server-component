import React, {useEffect} from 'react'
import style from './index.module.css'

function TodoList({list, completeIds, onChange, onComplete, onDelete}) {
  useEffect(() => {
    onChange(list)
  }, [list, onChange])

  return (
    list.length > 0 && (
      <ul className={style.todoUl}>
        {list.map((item, index) => (
          <li key={index}>
            <span
              className={`${style.checkBox} ${completeIds.includes(item.id) ? style.checked : ''}`}
              onClick={() => onComplete?.(item.id)}></span>
            <span className={style.text}>{item.name}</span>
            <span className={style.delButton} onClick={() => onDelete?.(item.id)}></span>
          </li>
        ))}
      </ul>
    )
  )
}

export default TodoList
