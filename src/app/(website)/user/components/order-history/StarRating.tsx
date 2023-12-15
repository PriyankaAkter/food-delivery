import React from "react";

type StarRatingProps = {
  value: number;
  onChange: (newValue: number) => void;
};

const StarRating: React.FC<StarRatingProps> = ({ value, onChange }) => {
  const stars = Array.from({ length: 5 }, (_, index) => index + 1);

  return (
    <div className="flex items-center gap-1">
      {stars.map((star) => (
        <button
          key={star}
          type="button"
          onClick={() => onChange(star)}
          className={`text-xl ${
            star <= value ? "text-yellow-500" : "text-gray-300"
          }`}
        >
          ★
        </button>
      ))}
    </div>
  );
};

export default StarRating;
