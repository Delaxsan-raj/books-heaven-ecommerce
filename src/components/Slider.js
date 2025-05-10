import { Carousel } from "react-bootstrap";

function MainSlider() {
  return (
    <Carousel fade interval={3000} className="mb-4">
      <Carousel.Item>
        <img
          className="d-block w-100"
          src="/images/slide1.jpg"
          alt="First slide"
          style={{ height: "500px", objectFit: "cover" }}
        />
        <Carousel.Caption className="bg-dark bg-opacity-50 rounded-3">
          <h3>Best Sellers</h3>
          <p>Discover our most popular books</p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <img
          className="d-block w-100"
          src="/images/slide2.jpg"
          alt="Second slide"
          style={{ height: "500px", objectFit: "cover" }}
        />
        <Carousel.Caption className="bg-dark bg-opacity-50 rounded-3">
          <h3>New Arrivals</h3>
          <p>Explore our latest additions</p>
        </Carousel.Caption>
      </Carousel.Item>
    </Carousel>
  );
}

export default MainSlider;
