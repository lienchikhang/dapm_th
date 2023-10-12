import React, { useEffect, useState } from 'react'
import { Radio, ConfigProvider } from 'antd';
import { useDispatch } from 'react-redux';
import { saveInfo } from '../../../reducers/checkOutReducer';
export default function InfoOrder() {
  const [phone, setPhone] = useState()
  const [address, setAddress] = useState()
  const [name, setName] = useState()
  const [methodPay, setMethodPay] = useState("COD")
  const [change, setChange] = useState(false)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(saveInfo({ phone, address, name, methodPay }))
  }, [change])
  const onChange = (e) => {
    setMethodPay(e.target.value);
    setChange(!change)
  };
  return (
    <div className='d-flex flex-column' style={{ width: '100%' }}>
      <form className='' >
        <div className='Info-Input'>
          <label className='label-text mt-0' >Tên người nhận:
            <input onChange={(e) => {
              setName(e.target.value)
              setChange(!change)
            }} className='ml-1 Info-Input' type='text' style={{ border: 0, outline: "none" }}></input>
          </label>
        </div>
        <div className='Info-Input mb-1 mt-2'>
          <label className='label-text mt-0'>Số điện thoại:
            <input onChange={ (e) => {
              setPhone(e.target.value)    
              setChange(!change)
            }} className='ml-1 Info-Input ' type='number' style={{ border: 0, outline: "none" }}  ></input>
          </label>
        </div>
        <div className='Info-Input mb-1 mt-2'>
          <label className='label-text mt-0'>Địa chỉ:
            <input onChange={ (e) => {
              setAddress(e.target.value)
              setChange(!change)

            }} className='ml-1 Info-Input ' type='text' style={{ border: 0, outline: "none" }}></input>
          </label>
        </div>
        <div className='d-flex flex-column'>
          <span className='label-text '>Phương thức thanh toán</span>
          <ConfigProvider
            theme={{
              components: {
                Radio: {

                },
              },
            }}
          >
            <Radio.Group onChange={onChange} value={methodPay}>
              <Radio defaultChecked='true' value="COD">COD </Radio>
              <Radio value="VNPay">VNPay </Radio>
            </Radio.Group>
          </ConfigProvider>
        </div>
      </form>
    </div>
  )
}

