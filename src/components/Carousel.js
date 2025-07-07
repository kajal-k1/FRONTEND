import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import './Carousel.css';

const Carousel = () => {
  const navigate = useNavigate();

  const carouselImages = [
    'https://assets.tatacliq.com/medias/sys_master/images/65236471611422.png',
    'https://assets.tatacliq.com/medias/sys_master/images/65236471808030.png',
    'https://assets.tatacliq.com/medias/sys_master/images/65236471742494.png',
    'https://assets.tatacliq.com/medias/sys_master/images/65236471939102.png',
    'https://assets.tatacliq.com/medias/sys_master/images/65236472070174.png',
  ];

  const handleImageClick = (index) => {
    const routes = {
      0: '/category/ethnic-wear',
      1: '/category/footwear',
      2:'/category/mens-wear',
      3:'/category/watches',
      4:'/category/kids-wear'
      
    };

    const route = routes[index];
    if (route) {
      navigate(route);
    }
  };

  return (
    <div className="carousel-container-a">
      <Swiper
        spaceBetween={0}
        centeredSlides={true}
        autoplay={{
          delay: 2000,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
        }}
        navigation={true}
        modules={[Autoplay, Pagination, Navigation]}
        className="tatacliq-swiper-a"
      >
        {carouselImages.map((image, index) => (
          <SwiperSlide key={index}>
            <div
              className="slide-container-a"
              onClick={() => handleImageClick(index)}
              style={{ cursor: 'pointer' }}
            >
              <img
                src={image}
                alt={`Banner ${index + 1}`}
                className="carousel-image-a"
              />
              <div className="image-overlay-a"></div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default Carousel;


