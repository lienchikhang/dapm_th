import React from "react";
import Lottie from "lottie-react";
import developing from "../../../utils/developing.json";
export default function Developing() {
  return (
    <div>
      <Lottie
        animationData={developing} // Đường dẫn đến tệp JSON
        loop={true} // Tuỳ chọn: lặp hoặc không lặp
        autoplay={true} // Tuỳ chọn: tự động phát khi trang web được nạp
      />
    </div>
  );
}
