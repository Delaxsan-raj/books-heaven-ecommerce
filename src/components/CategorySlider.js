// src/components/CategorySlider.js
import React from "react";
import { Button, Carousel, Container } from "react-bootstrap";

const CategorySlider = () => {
  const categories = [
    {
      title: "New Collection",
      image: "/images/psychology.jpg",
      subtitle: "Earth's Children's Collection",
    },
    {
      title: "Childrens Collection",
      image: "/path/to/dinosaur-bg.jpg",
      subtitle: "Prehistoric Adventures",
    },
    {
      title: "Adventure Collection",
      image: "/images/fault.png",
      subtitle: "Wilderness Explorations",
    },
  ];

  return (
    <Container className="my-5">
      <h2 className="text-center mb-4">Explore Collections</h2>

      <Carousel indicators={true} interval={3000}>
        {categories.map((category, index) => (
          <Carousel.Item key={index}>
            <div
              className="position-relative rounded-3 overflow-hidden"
              style={{
                height: "400px",
                backgroundImage: `url(${category.image})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
            >
              <div className="position-absolute top-0 start-0 w-100 h-100 bg-dark opacity-50"></div>

              {/* Adjusted content positioning */}
              <div className="position-relative h-100 d-flex align-items-center p-4 text-white">
                <div
                  className="ms-auto"
                  style={{
                    maxWidth: "600px",
                    paddingRight: "60px", // Space for carousel control
                    marginRight: "30px", // Additional safety margin
                  }}
                >
                  <h3 className="display-4 fw-bold mb-3">{category.title}</h3>
                  <p className="lead mb-4">{category.subtitle}</p>
                  <Button variant="light" size="lg" className="px-5 py-3">
                    Explore Collection
                  </Button>
                </div>
              </div>
            </div>
          </Carousel.Item>
        ))}
      </Carousel>

      {/* Custom carousel control styling */}
      <style>{`
        .carousel-control-next,
        .carousel-control-prev {
          width: 5%;
          opacity: 1;
          z-index: 2;
        }
        .carousel-control-next-icon,
        .carousel-control-prev-icon {
          background-color: rgba(255, 255, 255, 0.5);
          border-radius: 50%;
          padding: 1.5rem;
          background-size: 60%;
        }
      `}</style>
    </Container>
  );
};

export default CategorySlider;
