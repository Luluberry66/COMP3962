import React from 'react'
import { Link } from 'react-router-dom'
import './Hero.css'
import cloud_icon from '../Assets/clouds_transparent_icon.png'
import arrow_icon from '../Assets/arrow.png'

const Hero = () => {
  return (
    <div className='hero'>
      <div className="hero-left">
        <h2>New shipments every season</h2>
        <div className='hero-big-blurb'>
            <div className="hero-hand-icon">
                <p>Cloud</p>
                <img src={cloud_icon} alt="" />
            </div>
            <p>collections</p>
            <p>for everyone</p>
        </div>
      </div>
      <div className="hero-right">
      <div className="hero-latest-btn">
          <Link to="/shop"> {/* Link to the /shop route */}
            <div>Shop Now</div>
            <div className="arrow-center">
              <img src={arrow_icon} alt="" />
            </div>
          </Link>
        </div>
      </div>
    </div>
  )
}

export default Hero
