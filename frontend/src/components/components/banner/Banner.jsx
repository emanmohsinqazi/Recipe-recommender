import { useState } from 'react';
import Slider from 'react-slick';
import BannerSlide from './BannerSlide';
import { banners } from '../../../data/banners';
import Container from '../ui/Container';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

export default function Banner() {
  const [currentSlide, setCurrentSlide] = useState(0);

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    beforeChange: (_, next) => setCurrentSlide(next),
    customPaging: (i) => (
      <div
        className={`w-3 h-3 rounded-full transition-all duration-300 ${
          i === currentSlide ? 'bg-primary scale-125' : 'bg-gray-300'
        }`}
      />
    ),
  };

  return (
    <Container className="my-8">
      <Slider {...settings}>
        {banners.map((banner) => (
          <BannerSlide key={banner.id} banner={banner} />
        ))}
      </Slider>
    </Container>
  );
}