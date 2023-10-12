import React from "react";
import { FacebookFilled } from "@ant-design/icons";
import "../css/footer.css";
export default function Footer() {
  return (
    <div className="container-fluid p-4 footer__wrapper">
      <div className="row">
        <div className="col-3">
          <h3 className="footer__heading">Liên lạc</h3>
          <ul className="my-footer">
            <li className="d-flex justify-content-between">
              <span>Liên hệ</span>
              <span>info@gmail.com</span>
            </li>
            <li className="d-flex justify-content-between">
              <span>Địa chỉ</span>
              <span>123 phường 10 quận 3,TP.HCM</span>
            </li>
            <li className="d-flex justify-content-between">
              <span>SĐT</span>
              <span>09000000</span>
            </li>
          </ul>
        </div>
        <div className="col-3">
          <h3 className="footer__heading">Trợ giúp</h3>
          <ul className="my-footer">
            <li>Tình trạng đơn hàng</li>
            <li>Vận chuyển</li>
            <li>Đổi trả</li>
            <li>Phương thức thanh toán</li>
            <li>Liên hệ chúng tôi</li>
          </ul>
        </div>
        <div className="col-3">
          <h3 className="footer__heading">Về chúng tôi</h3>
          <ul className="my-footer">
            <li>Tin tức</li>
            <li>Công việc</li>
          </ul>
        </div>
        <div className="col-3">
          <ul className="my-footer social">
            <li>
              <i class="fa-brands fa-facebook-f"></i>
            </li>
            <li>
              <i class="fa-brands fa-twitter"></i>
            </li>
            <li>
              <i class="fa-brands fa-instagram"></i>
            </li>
            <li>
              <i class="fa-brands fa-youtube"></i>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
