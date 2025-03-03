import React from 'react'
import './style.css'
function Style({children}) {
  return (
    <div className='stylePage'>
      <div className='navBar'> {children}</div>
    </div>
  )
}

export default Style
