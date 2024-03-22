import React, { useContext } from 'react'
import './CSS/ShopCategory.css'
import { ShopContext } from '../Context/ShopContext'
import dropdown_icon from '../Components/Assets/dropdown_icon.png'
import Item from '../Components/Item/Item'
import Banner from '../Components/Hero/Banner'
import shop_banner from '../Components/Assets/cloud1.png'


const Shop = () => {
  const {all_product} = useContext(ShopContext);
  return (
    <div className='shop-category'>
      <Banner title="Shop" eyebrow="shop with us!"/>
      <div className='white-strip'>
        <div className="shopcategory-indexSort">
          <p>
            <span>Showing 1-12</span> out of 36 products
          </p>
          <div className="shopcategory-sort">
            Sort by <img src={dropdown_icon} alt="" />
          </div>
        </div>
        <div className="shopcategory-products">
          {all_product.map((item,i)=>{
              return <Item key={i} id={item.id} name={item.name} image={item.image} new_price={item.new_price} old_price={item.old_price}/>

          })}
        </div>
        <div className="shopcategory-loadmore">
          Explore More
        </div>
      </div>
    </div>
  )
}

export default Shop