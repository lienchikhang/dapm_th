import React from 'react'
import CartItem from './CartItem'
import CartFooter  from './CartFooter'
export default function Cart() {
  return (
    <div>
      <div className='container'>
      <table className='table table-borderless'>
        <thead>
          <th>SAN PHAM</th>
          <th></th>
          <th>Qty</th>
          <th>Giá</th>
          <th>Tổng</th>
          <th></th>
        </thead>
        <tbody>
          <CartItem></CartItem>
          <CartItem></CartItem>
        </tbody>
      </table>
      <CartFooter></CartFooter>
    </div>
    </div>
  )
}
