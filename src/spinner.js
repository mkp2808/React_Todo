import React, { Component } from 'react'
import loading from './loading.gif'
import './components/css/Spinner.css'
export class Spinner extends Component {
  render() {
    return (
      <>
      
        <div className="container text-center">
            <img src={loading} className='vertical-center' alt="spinner" />
        </div>
      </>
    )
  }
}

export default Spinner