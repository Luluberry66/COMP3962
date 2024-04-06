import React from 'react'
import './Banner.css'
import hand_icon from '../Assets/hand_icon.png'
import arrow_icon from '../Assets/arrow.png'
import hero_image from '../Assets/hero_image.png'

const Banner = (props) => {
  return (
    <div className='hero' style={{ backgroundImage: `url(${props.image})` }}>
    <div className="hero-left">
      <div className="hero-content">
        <h2>{props.eyebrow}</h2>
        <div className="hero-hand-icon">
        <p>{props.title}</p>
        </div>
      </div>
    </div>
  </div>
  )
}

export default Banner
