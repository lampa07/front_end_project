
export const RatingStars = ({ score, reviewsCount }) => {
  const stars = Array.from({ length: 5 }, (_, i) => i < Math.floor(score) ? '★' : '☆');
  return (
    <div className="rating-stars">
      <span className="stars-icons">{stars.join('')}</span>
      <span className="score-val">{score}</span>
      {reviewsCount !== undefined && <span className="reviews-count">({reviewsCount} reviews)</span>}
    </div>
  );
};