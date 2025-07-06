import {React, useState, useEffect} from 'react'
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { Navigation } from 'swiper/modules';
import Card from './Card';
import { useContextProvider } from '../context/AppContext';

const FeaturedProducts = () => {
  const { products } = useContextProvider();
  const [featuredProducts, setFeaturedProducts] = useState([])


  useEffect(() => {
      if (products.length > 0) {
          const featured = products
              .slice(0, 5)
          setFeaturedProducts(featured)
      }
  }, [products])
  return (
    <>
      <Swiper
        slidesPerView={'auto'}
        centeredSlides={false}
        spaceBetween={20}
        navigation={true}
        modules={[Navigation]}
        className="mySwiper"
    //     breakpoints={{
    //     0: {
    //       slidesPerView: 1,
    //       spaceBetween: 20,
    //     },
    //     768: {
    //       slidesPerView: 2,
    //       spaceBetween: 20,
    //     },
    //     1024: {
    //       slidesPerView: 3,
    //       spaceBetween: 30,
    //     },
    //     1280: {
    //       slidesPerView: 4,
    //       spaceBetween: 30,
    //     },
    //   }}
      
      >
        {featuredProducts.map((p) => (
            <SwiperSlide key={p.id} className="!w-[260px]"><Card product={p} /></SwiperSlide>
        ))}
      </Swiper>
      
    </>
  )
}

export default FeaturedProducts