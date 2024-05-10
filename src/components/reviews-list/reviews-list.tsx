import { TReview } from '../../types/reviews';
import ReviewCard from '../review-card/review-card';

type ReviewsListProps = {
  reviews: TReview[];
};

const ReviewsList = (({ reviews }: ReviewsListProps) => (
  <ul className="review-block__list">
    {reviews.map((review) => (
      <ReviewCard key={review.id} reviewData={review} />
    ))}
  </ul>
));

export default ReviewsList;
