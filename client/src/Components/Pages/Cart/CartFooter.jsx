import React from 'react'
import "../../../css/Cart.css"
export default function CartFooter() {
  return (

    <div className='container'>
      <div className='d-flex flex-row-reverse mr-5'>       
        <button className='btn btn-buy '>Thanh toán</button>
        <span className='align-self-center mr-5'>Tổng tiền:$600</span>
      </div>
    </div>

  )
}
