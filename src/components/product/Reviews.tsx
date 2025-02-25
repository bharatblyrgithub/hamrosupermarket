'use client';

interface Review {
  id: string;
  rating: number;
  comment: string;
  user: string;
}

interface ReviewsProps {
  reviews: Review[];
}

const Reviews = ({ reviews }: ReviewsProps) => {
  if (reviews.length === 0) {
    return <p className="text-gray-500">No reviews yet.</p>;
  }

  return (
    <div className="space-y-4">
      {reviews.map(review => (
        <div key={review.id} className="border-b border-gray-200 pb-4">
          <div className="flex items-center justify-between">
            <span className="font-semibold">{review.user}</span>
            <span className="text-yellow-500">{'★'.repeat(review.rating)}</span>
          </div>
          <p className="mt-1 text-gray-700">{review.comment}</p>
        </div>
      ))}
    </div>
  );
};

export default Reviews;
