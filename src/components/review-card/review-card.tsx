import dayjs from 'dayjs';
import 'dayjs/locale/ru';
import StarRating from '../star-rating/star-rating';
import { TReview } from '../../types/reviews';

type ReviewCardProps = {
  reviewData: TReview;
};

const ReviewCard = ({reviewData}: ReviewCardProps): JSX.Element => {

  const {createAt, userName, advantage, disadvantage, review, rating} = reviewData;

  dayjs.locale('ru');
  const date = dayjs(createAt);
  const formattedDate = date.format('DD MMMM');

  return (
    <li className="review-card">

      <div className="review-card__head">
        <p className="title title--h4">{userName}</p>
        <time className="review-card__data" dateTime="2022-04-13">
          {formattedDate}
        </time>
      </div>

      <StarRating rating={rating}/>

      <ul className="review-card__list">

        <li className="item-list">
          <span className="item-list__title">Достоинства:</span>
          <p className="item-list__text">
            {advantage}
          </p>
        </li>

        <li className="item-list">
          <span className="item-list__title">Недостатки:</span>
          <p className="item-list__text">
            {disadvantage}
          </p>
        </li>

        <li className="item-list">
          <span className="item-list__title">Комментарий:</span>
          <p className="item-list__text">
            {review}
          </p>
        </li>

      </ul>

    </li>
  );
};

export default ReviewCard;
