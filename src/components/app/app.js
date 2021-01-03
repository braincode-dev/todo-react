import React from 'react'
import AppHeader from '../app-header'
import SearchPanel from '../search-panel'
import TodoLists from '../todo-lists'
import ItemStatusFilter from '../item-status-filter'
import ItemAddForm from '../item-add-form'

import './app.css'

export default class App extends React.Component {
  
  maxId = 100

  state = {
    todoData: [
      this.createLabel('Learn Reack'),
      this.createLabel('Build awesome App'),
      this.createLabel('Go to sleep')
    ],
    term: '',
    filter: 'all'  // all, active, done
  }

  toggleProperty(arr, id, propName){
    const idx = arr.findIndex((item) => item.id === id);
    const oldItem = arr[idx];
    const value = !oldItem[propName];

    const item = { ...arr[idx], [propName]: value } ;
    return [
      ...arr.slice(0, idx),
      item,
      ...arr.slice(idx + 1)
    ];
  }

  onToggleImportant = (id) => {
    this.setState(( {todoData} ) => {
      return {
        todoData: this.toggleProperty(todoData, id, 'important')
      }
    })
  }

  onToggleDone = (id) => {
    this.setState(( {todoData} ) => {
      return {
        todoData: this.toggleProperty(todoData, id, 'done')
      }
    })
  }

  createLabel(label){
    return {
      label,
      done: false,
      important: false,
      id: this.maxId++
    }
  }

  createItem = (text) => {
    const newArr = this.createLabel(text)
    this.setState(( {todoData} ) => {
      const newTodoData = [...todoData, newArr]
      return {
        todoData: newTodoData
      }
    })
  }

  deleteItem = (id) => {
    this.setState( ( {todoData} ) => {
      const idx = todoData.findIndex( (el) => el.id === id)
      // console.log(idx)
      const before = todoData.slice(0, idx)
      const after = todoData.slice(idx + 1)
      const newArr = [...before, ...after]

      return {
        todoData: newArr
      }
    })
  }

  onSearchChangeApp = (term) => {
    this.setState({term})
  }

  search(todoDataArr, termFilt){
    if(termFilt.length === 0){
      return todoDataArr
    }

    return todoDataArr.filter((el) => {
      return el.label.toLowerCase().indexOf(termFilt.toLowerCase()) > -1
    })
  }

  onFilterChange = (filter) => {
    this.setState({
      filter
    })
  }

  filter(items, filter){

    switch(filter){
      case 'all':
        return items
      case 'active':
        return items.filter((el) => !el.done)
      case 'done':
        return items.filter((el) => el.done)
      default:
        return items   
    }
  }

  render (){
    const { todoData, term, filter } = this.state
    const visibleItem = this.filter(this.search(todoData, term), filter)
    const doneCount = todoData.filter( (el) => el.done).length
    const todoCount = todoData.length - doneCount

    return (
      <div className='todo-app'>
        <AppHeader toDo={todoCount} done={doneCount}/>
        <div className='top-panel d-flex'>
          <SearchPanel onSearchChange={this.onSearchChangeApp}/>
          <ItemStatusFilter filter={filter} onFilterChange={this.onFilterChange}/> 
        </div>
        <TodoLists 
          todos={ visibleItem } 
          onDeleted={ this.deleteItem }
          onToggleImportant={ this.onToggleImportant }
          onToggleDone={ this.onToggleDone }
        />
        <ItemAddForm onCreate={ this.createItem } />
      </div>
    )
  }
  
}