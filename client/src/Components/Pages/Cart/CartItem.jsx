import React from 'react'

import "../../../css/Cart.css"
export default function Cart_item() {
  return (
    <tr>
            <td width={'150px'}>
              <img alt='img' className='img-shoe' src='https://i.pinimg.com/564x/b2/7b/1e/b27b1e36d5e6a5aec92809c25b6c04ad.jpg'/>
            </td>
            <td >
            <span>Van Old Skul</span>
            </td>
            <td style={{padding:'0'}}>
              <button className='btn'><i class="fa-solid fa-minus"></i></button>
              <span>1</span>
              <button className='btn'><i class="fa-solid fa-plus"></i></button>
            </td>
            <td>
              <span>$300</span>
            </td>
            <td>
              <span>$300</span>
            </td>
            <td>
            <i class="fa-solid fa-trash"></i>
            </td>
          </tr>
  )
}
