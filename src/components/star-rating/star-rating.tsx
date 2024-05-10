import { useLocation, useParams } from 'react-router-dom';

const MAX_RATING = 5;

type StarRatingProps = {
  rating: number;
  maxRating?: number;
  reviewCount?: number;
  isCommentSection?: boolean;
};
//TODO: Подумать как тут не использовать индекс для значения ключей
const StarRating = ({rating, maxRating = MAX_RATING, reviewCount, isCommentSection = false}: StarRatingProps): JSX.Element => {
  const location = useLocation();
  const {id} = useParams();
  const isProductPage = location.pathname === `/product/${id ? id : ''}`;

  return (
    <div className={isProductPage ? 'rate product__rate' : 'rate product-card__rate'}>
      {[...Array<number>(maxRating)].map((_, index) => (
        <svg
          // eslint-disable-next-line react/no-array-index-key
          key={`star-${index}`}
          width={17}
          height={16}
          aria-hidden="true"
        >
          <use xlinkHref={index < rating ? '#icon-full-star' : '#icon-star'} />
        </svg>
      ))}
      <p className="visually-hidden">Рейтинг: {rating}</p>
      {!isCommentSection &&
      <p className="rate__count">
        <span className="visually-hidden">Всего оценок:</span>{reviewCount}
      </p>}
    </div>
  );
};

export default StarRating;
