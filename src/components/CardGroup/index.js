import React from 'react'
import './style.css'

function CardGroup(props) {
  return (
    <div className="col-12 col-sm-6 col-md-4 col-lg-2 ">
    <div className='groupContainer' style={{backgroundColor:props.color}}>
        <h3 className="titleGroup">{props.title}</h3>
        <img src={props.img} className="backImg"/>
    </div>
    </div>
  )
}

export default CardGroup