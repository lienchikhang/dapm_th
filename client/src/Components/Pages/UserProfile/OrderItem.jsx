import React from "react";

export default function OrderItem(order) {
  const renderingShoe = () => {
    return order.data.shoes.map((shoe) => {
      return (
        <div>
          <div className="col">
            <div className="d-flex flex-row">
              <img className="d-inline" width="150px" src={shoe.img} alt="shoe" />
              <div className="d-flex flex-column pl-2">
                <span className="text-title">{shoe.name}</span>
                <span className="text-title">Số lượng:{shoe.quantity}</span>
                <span className="text-title">Size:{shoe.size}</span>
                <span className="text-title">{shoe.price * shoe.quantity}</span>
              </div>
            </div>
          </div>
          <div className="col">

          </div>
        </div>
      );
    });
  };
  return (
    <div>
      {renderingShoe()}
    </div>);
}
