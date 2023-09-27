import React from 'react'
import "../../../css/Detail.css"
export default function DetailCommon() {
    return (
        <div className='container mr-5 mt-5'>
            <div className='row'>
                <div className='col-6'>
                    <div className='d-flex flex-row'>
                        <div className='d-flex flex-column'>
                            <img alt='img-child' className='img-child border border-black' src='https://i.pinimg.com/564x/b2/7b/1e/b27b1e36d5e6a5aec92809c25b6c04ad.jpg' />
                            <img alt='img-child' className='img-child border border-black mt-2' src='https://i.pinimg.com/564x/b2/7b/1e/b27b1e36d5e6a5aec92809c25b6c04ad.jpg' />
                            <img alt='img-child' className='img-child border border-black mt-2' src='https://i.pinimg.com/564x/b2/7b/1e/b27b1e36d5e6a5aec92809c25b6c04ad.jpg' />
                        </div>
                        <img alt='img' className='' width={'395px'} height={'395px'} src='https://i.pinimg.com/564x/b2/7b/1e/b27b1e36d5e6a5aec92809c25b6c04ad.jpg' />
                    </div>
                    <div className='text-Baloo mb-4'>
                        <span>Mô tả</span>
                        <p style={{fontSize:'18px',fontWeight:'400'}}>
                            Được nhà thiết kế ưu ái khi sử dụng tone màu Tradewinds mới lạ, Vans Old Skool 36 DX thể hiện sự độc đáo và quyến rũ đầy tinh tế. 
                            “Tradewinds" là cụm từ để chỉ những cơn gió thường xuyên thổi từ hướng Đông ra phía Tây vùng nhiệt đới trên bề mặt biển. 
                            Gió này thường xuất hiện ở khu vực xung quanh xích đạo và thường mang theo một cảm giác dịu mát và thoải mái.
                        </p>
                    </div>
                </div>
                <div className='text-Baloo col-6 d-flex flex-column align-content-center'>
                    <span className='' style={{ fontSize: '24px', fontWeight: '400' }}>Vans Old Skul</span>
                    <span className='' style={{ fontSize: '28px', fontWeight: '400' }}>1.700.000</span>
                    <div>
                        <input className='border border-white' type='button' style={{ width: '20%', height: '45px' }} value={1}></input>
                        <span className='pl-3'>Size</span>
                    </div>
                    <button className='btn Btn-Add mt-4' >Thêm vào giỏ hàng</button>
                    <table className='table-borderless mt-4' width={'75%'} style={{ fontSize: '16px' }}>
                        <tr>
                            <td>Màu sắc</td>
                            <td>Đen</td>
                        </tr>
                        <tr>
                            <td>Hãng</td>
                            <td>Vans</td>
                        </tr>
                    </table>
                </div>
            </div>
        </div>
    )
}
