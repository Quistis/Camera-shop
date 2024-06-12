import { memo } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Autoplay } from 'swiper/modules';
import Banner from '../banner/banner';
import { TImagePreview } from '../../types/banners';
import 'swiper/css/bundle';
import 'swiper/css/pagination';
import './promos-slider.css';

type SliderProps = {
  promos: TImagePreview[];
};

const PromosSlider = memo(({ promos }: SliderProps): JSX.Element => (
  <Swiper
    modules={[Pagination, Autoplay]}
    spaceBetween={50}
    slidesPerView={1}
    autoplay={{ delay: 3000 }}
    pagination={{ clickable: true }}
  >
    {promos.map((promo) => (
      <SwiperSlide key={promo.id}>
        <Banner
          promo={promo}
        />
      </SwiperSlide>
    ))}
  </Swiper>
));

PromosSlider.displayName = 'PromosSlider';

export default PromosSlider;
