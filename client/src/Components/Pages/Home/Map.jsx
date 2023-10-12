import React from "react";
import "../../../css/map.css";

export default function Map() {
  return (
    <div className="wrapper ml-auto py-4" style={{ width: "90%" }}>
      <div className="d-flex">
        <div className="" style={{ width: "30%" }}>
          <h1 className="map__title">Hãy liên hệ với chúng tôi</h1>
          <ul
            className="map__ul"
            style={{
              listStyle: "",
              margin: "4px 0",
            }}
          >
            <li>
              <h5>Chi nhánh 1</h5>
              <p>123 đường 3/2, phường 10, quận 3, TP.HCM </p>
            </li>
            <li>
              <h5>Chi nhánh 2</h5>
              <p>10 QL22, Tân Xuân, Hóc Môn, Thành phố Hồ Chí Minh</p>
            </li>
            <li>
              <h5>Chi nhánh 3</h5>
              <p>123 đường 3/2, phường 10, quận 3, TP.HCM </p>
            </li>
          </ul>
        </div>
        <div className="" style={{ width: "75%" }}>
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3918.2901094780177!2d106.59805157489645!3d10.865525089288655!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31752b088de30f3b%3A0xd2140740d360f705!2sHCM%20City%20University%20of%20Foreign%20Languages%20-%20Information%20Technology%20(HUFLIT)%20-%20Hoc%20Mon%20Campus!5e0!3m2!1sen!2s!4v1695638442352!5m2!1sen!2s"
            width={"100%"}
            height={450}
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>
      </div>
    </div>
  );
}
