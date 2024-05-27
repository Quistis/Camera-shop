import { Link } from 'react-router-dom';
import StarRating from '../star-rating/star-rating';
import { TCamerasCard } from '../../types/cameras';
import './product-card.css';

type ProductCardsProps = {
  card: TCamerasCard;
  onClick?: (product?: TCamerasCard) => void | null;
  isActive?: boolean;
  className?: string;
};

const ProductCard = ({card, onClick, isActive, className}: ProductCardsProps): JSX.Element => {
  const {id, name, category, price, rating, reviewCount, previewImg, previewImg2x, previewImgWebp, previewImgWebp2x} = card;

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
        <button
          className="btn btn--purple product-card__btn"
          type="button"
          onClick={handleProductCardButtonClick}
        >
          Купить
        </button>
        <Link className="btn btn--transparent" to={`/camera/${id}`}>
          Подробнее
        </Link>
      </div>
    </div>
  );
};

export default ProductCard;
