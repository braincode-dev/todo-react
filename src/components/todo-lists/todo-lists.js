import React from 'react'
import TodoListItem from '../todo-list-item'
import './todo-lists.css'

const TodoLists = ( {todos, onDeleted, onToggleImportant, onToggleDone } ) => {
  const elements = todos.map((item) => {
    const {id, ...itemProps} = item // Rest parametr
    
    return (
      // <li><TodoListItem label={item.label} important={item.important}/></li>
      <li key={id} className='list-group-item'>
        <TodoListItem 
          { ...itemProps } 
          onDeleted = { ()=> onDeleted(id) } 
          onToggleImportant = { ()=> onToggleImportant(id) }
          onToggleDone = { ()=> onToggleDone(id) }
        />
      </li>
    )
  })
    return (
      <ul className='list-group todo-lists'>
        {elements}
      </ul>
    )
  }

  export default TodoLists