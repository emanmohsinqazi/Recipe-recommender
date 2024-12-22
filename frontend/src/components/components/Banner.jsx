import { useState } from 'react';
import Slider from 'react-slick';
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
  };

  return (
    <div className="max-w-7xl mx-auto my-8">
      <Slider {...settings}>
        <div className="relative bg-[#4CAF50] rounded-2xl overflow-hidden">
          <div className="flex items-center justify-between p-12">
            <div className="text-white max-w-lg">
              <img src="/rasa-logo.png" alt="Rasa Supermarket" className="mb-6 w-48" />
              <h2 className="text-5xl font-bold mb-4">SUPER SPECIAL SALE</h2>
              <p className="text-4xl font-bold mb-2">UP TO 50% OFF</p>
              <p className="mb-6">Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
              <p className="text-lg">www.rasa.com</p>
            </div>
            <div className="flex-1 flex justify-center">
              <img src="/grocery-basket.png" alt="Grocery Basket" className="w-96" />
            </div>
          </div>
        </div>
      </Slider>
    </div>
  );
}