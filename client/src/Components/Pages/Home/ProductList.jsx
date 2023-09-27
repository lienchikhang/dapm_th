import React, { useState } from "react";

export default function ProductList() {
    const [shoes, setShoes] = useState([]);
  return (
    <div className="container p-4">
        <div className="row">
            <div className="col">
                <div className="product">
                <div className="card">
                    <div className="card-top">
                        <img className="card-top" src="..." alt="Card image cap" width={100} />   
                    </div>
                    <div className="card-body">
                        <h2 className="card-title">Vans old Skool</h2>
                        <p className="card-text">
                            Some quick example text to build on the card title and make up
                            the bulk of the card's content.
                        </p>
                        <p className="card-title">1.777.000vnd</p>
                    </div>
                </div>
                </div>
            </div>
            <div className="col">
                <div className="product">
                <div className="card">
                    <div className="card-top">
                        <img className="card-top" src="..." alt="Card image cap" width={100} />   
                    </div>
                    <div className="card-body">
                        <h2 className="card-title">Vans old Skool</h2>
                        <p className="card-text">
                            Some quick example text to build on the card title and make up
                            the bulk of the card's content.
                        </p>
                        <p className="card-title">1.777.000vnd</p>
                    </div>
                </div>
                </div>
            </div>
            <div className="col">
                <div className="product">
                <div className="card">
                    <div className="card-top">
                        <img className="card-top" src="..." alt="Card image cap" width={100} />   
                    </div>
                    <div className="card-body">
                        <h2 className="card-title">Vans old Skool</h2>
                        <p className="card-text">
                            Some quick example text to build on the card title and make up
                            the bulk of the card's content.
                        </p>
                        <p className="card-title">1.777.000vnd</p>
                    </div>
                </div>
                </div>
            </div>
        </div>
        
    </div>
  );
}
