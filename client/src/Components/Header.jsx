import React from 'react'
import { NavLink } from 'react-router-dom'
import '../css/header.css'
import Right from './HeaderRight'
import HeaderNav from './HeaderNav'
export default function Header() {
  return (
    <div className='container d-flex'>
        <div className="row justify-content-between p-4 mx-auto align-items-center" style={{
            width: '85%'
        }}>
            <div style={{fontWeight: '700', fontSize: '24px'}}>LOGO</div>
            <HeaderNav/>
            <div className='d-flex'>
                <Right user={true}/>
                <Right/>
            </div>
        </div>
    </div>
  )
}
