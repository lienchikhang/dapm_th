import React from 'react'
import '../../../css/introduce.css'
import { NavLink } from 'react-router-dom'
import IntroductItem from './IntroductItem'
export default function Introduce() {
  return (
    <div className='my-introduce container p-4'>
      <IntroductItem />
      <IntroductItem />
      <IntroductItem />
      <div className="introduce__item">
        <div className="introduce__sub">
          <h3>Bộ Sưu tập mùa đông</h3>
          <p>là sự kết hợp tinh tế của thiết kế và chất liệu, mà còn là sự hiện đại hóa với những xu hướng thời
            trang đang thịnh hành.</p>
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
