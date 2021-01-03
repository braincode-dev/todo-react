import React from 'react'
import './search-panel.css'

export default class SearchPanel extends React.Component {

  state = {
    label: ''
  }

  onSearchChange = (e) => {
    const term = e.target.value
    this.setState({
      label: term
    })
    this.props.onSearchChange(term)
  }

  render() {
    const searchText = 'Type here to search'
    const searchStyle = {
      fontSize: '20px'
    }
    
    return(
      <input className='search-input form-control' style={searchStyle} placeholder={searchText} value={this.state.label} onChange={this.onSearchChange}/>
    )
  }
}