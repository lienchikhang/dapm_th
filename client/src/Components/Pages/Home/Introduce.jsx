import React from 'react'
import '../../../css/introduce.css'
import { NavLink } from 'react-router-dom'
import IntroductItem from './IntroductItem'
export default function Introduce() {
  return (
    <div className='my-introduce container p-4'>
        <IntroductItem/>
        <IntroductItem/>
        <IntroductItem/>
        <div className="introduce__item">
          <div className="introduce__sub">
            <h3>Ttile</h3>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Animi exercitationem pariatur delectus ut quisquam molestiae labore laboriosam recusandae sint hic!</p>
            <NavLink>Xem thêm</NavLink>
          </div>
        </div>
        <div className="introduce__item"></div>
        <div className="introduce__item"></div>
        <div className="introduce__item"></div>
        <div className="introduce__item"></div>
    </div>
  )
}
