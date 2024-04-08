import React from 'react'
import './DescriptionBox.css'

const DescriptionBox = (props) => {
  const {product} = props;

  return (
    <div className='descriptionbox'>
      <div className="descriptionbox-navigator">
        <div className="descriptionbox-nav-box">Description</div>
      </div>
      <div className="descriptionbox-description">
        <p><b>{product.name}</b></p>
          <p>
            {product.description}
          </p>
      </div>
    </div>
  )
}

export default DescriptionBox
