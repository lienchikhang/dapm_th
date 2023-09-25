import React from 'react'
import '../css/footer.css'
export default function Footer() {
  return (
    <div className='container'>
        <div className="row">
            <div className="col-3">
                <h3>Về chúng tôi</h3>
                <ul className='my-footer'>
                    <li className='d-flex justify-content-between'>
                        <span>Liên hệ</span>
                        <span>info@gmail.com</span>
                    </li>
                    <li className='d-flex justify-content-between'>
                        <span>Địa chỉ</span>
                        <span>123 phường 10 quận 3,TP.HCM</span>
                    </li>
                    <li className='d-flex justify-content-between'>
                        <span>SĐT</span>
                        <span>09000000</span>
                    </li>
                </ul>
            </div>
            <div className="col-3">
                <h3>Về chúng tôi</h3>
                <ul className='my-footer'>
                    <li>Liên hệ</li>
                    <li>Địa chỉ</li>
                    <li>Số điện thoại</li>
                </ul>
            </div>
            <div className="col-3">
                <h3>Về chúng tôi</h3>
                <ul className='my-footer'>
                    <li>Liên hệ</li>
                    <li>Địa chỉ</li>
                    <li>Số điện thoại</li>
                </ul>
            </div>
            <div className="col-3">
                <h3>Về chúng tôi</h3>
                <ul className='my-footer'>
                    <li>Liên hệ</li>
                    <li>Địa chỉ</li>
                    <li>Số điện thoại</li>
                </ul>
            </div>
        </div>
    </div>
  )
}
