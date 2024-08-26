import React, { useState } from 'react';
// import './Rating.css'; // For custom styles

const StarRating = ({ maxStars = 5, initialRating = 0, onRatingChange }) => {
    const [rating, setRating] = useState(initialRating);

    const handleStarClick = (newRating) => {
        setRating(newRating);
        if (onRatingChange) {
            onRatingChange(newRating);
        }
    };

    return (
        <div className="rating-container">
            {[...Array(maxStars)].map((_, index) => (
                <Star
                    key={index}
                    index={index + 1}
                    isFilled={index < rating}
                    onClick={() => handleStarClick(index + 1)}
                />
            ))}
        </div>
    );
};

const Star = ({ index, isFilled, onClick }) => {
    return (
        <span
            className={`star ${isFilled ? 'filled' : ''}`}
            onClick={onClick}
        >
            ★
        </span>
    );
};

export default StarRating;
