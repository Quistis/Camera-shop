import { useState, useCallback, memo } from 'react';
import ProductCard from '../product-card/product-card';
import { TCamerasCard } from '../../types/cameras';

type ProductSliderProps = {
  products: TCamerasCard[];
  itemsPerPage: number;
  onClick?: (product?: TCamerasCard) => void | null;
};

const ProductsSlider = memo(({ products, itemsPerPage, onClick }: ProductSliderProps): JSX.Element | null => {
  const [startIndex, setStartIndex] = useState(0);
  const [isGoingBack, setIsGoingBack] = useState(false);

  const endIndex = startIndex + itemsPerPage;

  const handlePrevButtonClick = useCallback(() => {
    if (startIndex > 0) {
      setStartIndex((prevIndex) => prevIndex - itemsPerPage);
      setIsGoingBack(true);
    }
  }, [startIndex, itemsPerPage]);

  const handleNextButtonClick = useCallback(() => {
    if (endIndex < products.length) {
      setStartIndex((prevIndex) => prevIndex + itemsPerPage);
      setIsGoingBack(false);
    }
  }, [endIndex, itemsPerPage, products.length]);

  return (
    <div className="product-similar__slider">
      <div className="product-similar__slider-list">
        {products.slice(startIndex, endIndex).map((product) => (
          <ProductCard
            key={product.id}
            card={product}
            isActive
            className={isGoingBack ? 'showBack' : 'showForward'}
            onClick={onClick}
          />
        ))}
      </div>
      <button
        className="slider-controls slider-controls--prev"
        type="button"
        aria-label="Предыдущий слайд"
        onClick={handlePrevButtonClick}
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
        onClick={handleNextButtonClick}
        disabled={endIndex >= products.length}
      >
        <svg width={7} height={12} aria-hidden="true">
          <use xlinkHref="#icon-arrow" />
        </svg>
      </button>
    </div>
  );
});

ProductsSlider.displayName = 'ProductsSlider';

export default ProductsSlider;
