import React from 'react'

export default function ShoeItem({ data }) {
  const { _id, img, name, price, quantity, size } = data;
  return (
    <div className='d-flex d-flex-row'>
      <div style={{ width: '200px' }}>
        <img className='img-item img-fluid' alt='shoe' src={img} />
      </div>
      <div>
        <span className='label-text'>{name} ({size})</span>
        <table className='table table-borderless '>
          <tr>
            <td>Qty:</td>
            <td>{quantity}</td>
          </tr>
          <tr>
            <td>Giá:</td>
            <td>{price}</td>
          </tr>
          <tr>
            <td>Tổng:</td>
            <td>{price * quantity}</td>
          </tr>
        </table>
      </div>
    </div>
  )
}
