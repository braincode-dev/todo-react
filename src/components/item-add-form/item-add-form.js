import React from 'react'

import './item-add-form.css'

export default class ItemAddForm extends React.Component {
    
    state = {
        label: ''
    }

    onLabelChange = (e) => {
        this.setState({
            label: e.target.value
        })
    }

    onSubmitForm = (e) => {
        e.preventDefault()
        this.props.onCreate(this.state.label)
        this.setState({
            label: ''
        })
    }
    
    render(){
        return (
            <form className='item-add-form d-flex' onSubmit={this.onSubmitForm}>
                <input type='text' className='form-control' onChange={this.onLabelChange} placeholder='What need to be done' value={this.state.label} />
                <button className='btn btn-outline-secondary'> 
                    Add
                </button>
            </form>
        )
    }
}