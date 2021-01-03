import React from 'react';
import './todo-list-item.css';

export default class TodoListItem extends React.Component {

  render(){
    const { label, onDeleted, onToggleImportant, onToggleDone, done, important  } = this.props

    let className = 'todo-list-item'
    let btnImportantClassName = 'btn btn-outline-success btn-sm float-right'
    if(done){
      className += ' done'
    }

    if(important){
      className += ' important'
    }
  
    return (
      <span className={className}>
        <span onClick={ onToggleDone } className='todo-list-item-label'>
          {label}
        </span>
  
        <button onClick={ onToggleImportant } type="button" className={btnImportantClassName} >
          <i className="fa fa-exclamation" />
        </button>
  
        <button onClick={ onDeleted } type="button" className="btn btn-outline-danger btn-sm float-right">
          <i className="fa fa-trash-o" />
        </button>
      </span>
    )
  }

}