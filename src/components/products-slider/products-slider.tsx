import { useState } from 'react';
import ProductCard from '../product-card/product-card';
import { TCamerasCard } from '../../types/cameras';

type ProductSliderProps = {
  products: TCamerasCard[];
  itemsPerPage: number;
};

const ProductsSlider = ({ products, itemsPerPage }: ProductSliderProps): JSX.Element => {
  const [startIndex, setStartIndex] = useState(0);
  const [isGoingBack, setIsGoingBack] = useState(false);

  const endIndex = startIndex + itemsPerPage;

  const handlePrev = () => {
    if (startIndex > 0) {
      setStartIndex((prevIndex) => prevIndex - itemsPerPage);
      setIsGoingBack(true);
    }
  };

  const handleNext = () => {
    if (endIndex < products.length) {
      setStartIndex((prevIndex) => prevIndex + itemsPerPage);
      setIsGoingBack(false);
    }
  };

  return (
    <div className="product-similar__slider">
      <div className="product-similar__slider-list">
        {products.slice(startIndex, endIndex).map((product) => (
          <ProductCard
            key={product.id}
            card={product}
            isActive
            className={isGoingBack ? 'showBack' : 'showForward'}
          />
        ))}
      </div>
      <button
        className="slider-controls slider-controls--prev"
        type="button"
        aria-label="Предыдущий слайд"
        onClick={handlePrev}
        disabled={startIndex === 0}
      >
        <svg width={7} height={12} aria-hidden="true">
          <use xlinkHref="#icon-arrow" />
        </svg>
      </button>
      <button
        className="slider-controls slider-controls--next"
        type="button"
        aria-label="Следующий слайд"
        onClick={handleNext}
        disabled={endIndex >= products.length}
      >
        <svg width={7} height={12} aria-hidden="true">
          <use xlinkHref="#icon-arrow" />
        </svg>
      </button>
    </div>
  );
};

export default ProductsSlider;
