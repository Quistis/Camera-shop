import { memo } from 'react';
import { Link } from 'react-router-dom';
import { useAppSelector } from '../../hooks';
import { selectCartItems } from '../../store/slices/cart';
import StarRating from '../star-rating/star-rating';
import { TCamerasCard } from '../../types/cameras';
import { AppRoutes } from '../../const';
import './product-card.css';


type ProductCardsProps = {
  card: TCamerasCard;
  onClick?: (product?: TCamerasCard) => void | null;
  isActive?: boolean;
  className?: string;
};

const ProductCard = memo(({card, onClick, isActive, className}: ProductCardsProps): JSX.Element => {

  const cartItems = useAppSelector(selectCartItems);
  const {id, name, category, price, rating, reviewCount, previewImg, previewImg2x, previewImgWebp, previewImgWebp2x} = card;
  const isCurrentProductInCart = cartItems.some((item) => item.id === id);

  const handleProductCardButtonClick = () => {
    if (onClick) {
      onClick(card);
    }
  };

  return (
    <div className={`product-card ${className ? className : ''} ${isActive ? 'is-active' : ''}`}>
      <div className="product-card__img">
        <picture>
          <source
            type="image/webp"
            srcSet={`/${previewImgWebp}, /${previewImgWebp2x} 2x`}
          />
          <img
            src={`/${previewImg}`}
            srcSet={`/${previewImg2x} 2x`}
            width={280}
            height={240}
            alt={name}
          />
        </picture>
      </div>
      <div className="product-card__info">
        <StarRating rating={rating} reviewCount={reviewCount}/>
        <p className="product-card__title">
          {name.includes('Ретрокамера') ? name : `${category} ${name}`}
        </p>
        <p className="product-card__price">
          <span className="visually-hidden">Цена:</span>{price.toLocaleString('ru-RU')} ₽
        </p>
      </div>
      <div className="product-card__buttons">
        {isCurrentProductInCart ?
          <Link className="btn btn--purple-border" to={AppRoutes.Cart}>
            <svg width={16} height={16} aria-hidden="true">
              <use xlinkHref="#icon-basket" />
            </svg>
            В корзине
          </Link>
          :
          <button
            className="btn btn--purple product-card__btn"
            type="button"
            onClick={handleProductCardButtonClick}
          >
            Купить
          </button>}
        {/* <button
          className="btn btn--purple product-card__btn"
          type="button"
          onClick={handleProductCardButtonClick}
        >
          Купить
        </button> */}
        <Link className="btn btn--transparent" to={`/camera/${id}`}>
          Подробнее
        </Link>
      </div>
    </div>
  );
});

ProductCard.displayName = 'ProductCard';

export default ProductCard;
