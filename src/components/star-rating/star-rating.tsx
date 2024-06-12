import { useLocation, useParams } from 'react-router-dom';

const MAX_RATING = 5;

type StarRatingProps = {
  rating: number;
  maxRating?: number;
  reviewCount?: number;
  isCommentSection?: boolean;
};

const StarRating = ({rating, maxRating = MAX_RATING, reviewCount, isCommentSection = false}: StarRatingProps): JSX.Element => {
  const location = useLocation();
  const {id} = useParams();
  const isProductPage = location.pathname === `/camera/${id ? id : ''}`;

  const stars = Array.from({ length: maxRating }, (_, index) => ({
    id: index,
    filled: index < rating,
  }));

  return (
    <div className={isProductPage ? 'rate product__rate' : 'rate product-card__rate'}>
      {stars.map((star) => (
        <svg
          key={star.id}
          width={17}
          height={16}
          aria-hidden="true"
        >
          <use xlinkHref={star.filled ? '#icon-full-star' : '#icon-star'} />
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
