import { memo } from 'react';
import { TReview } from '../../types/reviews';
import ReviewCard from '../review-card/review-card';

type ReviewsListProps = {
  reviews: TReview[];
};

const ReviewsList = memo((({ reviews }: ReviewsListProps) => (
  <ul className="review-block__list">
    {reviews.map((review) => (
      <ReviewCard key={review.id} reviewData={review} />
    ))}
  </ul>
)));

ReviewsList.displayName = 'ReviewsList';

export default ReviewsList;
