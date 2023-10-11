import React from "react";

export default function Carousel() {
  return (
    <div>
      <div
        id="carouselExampleIndicators"
        className="carousel slide"
        data-ride="carousel"
      >
        <ol className="carousel-indicators">
          <li
            data-target="#carouselExampleIndicators"
            data-slide-to={0}
            className="active"
          />
          <li data-target="#carouselExampleIndicators" data-slide-to={1} />
          <li data-target="#carouselExampleIndicators" data-slide-to={2} />
        </ol>
        <div className="carousel-inner">
          <div className="carousel-item active">
            <img
              className="d-block w-100 img-fluid"
              src="https://media.about.nike.com/images/b196703f-f105-41d7-9542-e75de08ad2bc/nike-zoomx-vaporfly-next3fk-proto-detail-05.jpg?fm=jpg&q=80&fit=max&crop=3000%2C2001%2C0%2C0&w=3840"
              alt="First slide"
              style={{ height: "800px", objectFit: "cover" }}
            />
          </div>
          <div className="carousel-item">
            <img
              className="d-block w-100"
              src="https://cdn.sanity.io/images/qa41whrn/prod/ef35c70f7f050204391aec9bb2f9e3b4a0c5b1ca-1536x1536.jpg?w=2160&q=80&auto=format"
              alt="Second slide"
              style={{ height: "800px", objectFit: "cover" }}
            />
          </div>
          <div className="carousel-item">
            <img
              className="d-block w-100"
              src="https://static.nike.com/a/images/w_1281,c_limit/ad28a4ec-1afa-4617-9276-ca0972facb38/nike-just-do-it.jpg"
              alt="Third slide"
              style={{ height: "800px", objectFit: "cover" }}
            />
          </div>
        </div>
        <a
          className="carousel-control-prev"
          href="#carouselExampleIndicators"
          role="button"
          data-slide="prev"
        >
          <span className="carousel-control-prev-icon" aria-hidden="true" />
          <span className="sr-only">Previous</span>
        </a>
        <a
          className="carousel-control-next"
          href="#carouselExampleIndicators"
          role="button"
          data-slide="next"
        >
          <span className="carousel-control-next-icon" aria-hidden="true" />
          <span className="sr-only">Next</span>
        </a>
      </div>
    </div>
  );
}
