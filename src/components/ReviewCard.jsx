import { Link } from "react-router-dom";

const ReviewCard = ({ review }) => {
  const { _id, title, genres, rating, date, photo } = review;
  return (
    <div className="card bg-base-100  shadow-sm">
      <figure>
        <img src={photo} alt="Shoes" />
      </figure>
      <div className="card-body">
        <h2 className="card-title">{title}</h2>
        <p>
          <div className="rating mr-2">
            <input
              type="radio"
              name="rating-2"
              className="mask mask-star-2 bg-orange-400"
              aria-label="1 star"
            />
            <input
              type="radio"
              name="rating-2"
              className="mask mask-star-2 bg-orange-400"
              aria-label="2 star"
              defaultChecked
            />
            <input
              type="radio"
              name="rating-2"
              className="mask mask-star-2 bg-orange-400"
              aria-label="3 star"
            />
            <input
              type="radio"
              name="rating-2"
              className="mask mask-star-2 bg-orange-400"
              aria-label="4 star"
            />
            <input
              type="radio"
              name="rating-2"
              className="mask mask-star-2 bg-orange-400"
              aria-label="5 star"
            />
          </div>
          {rating}
        </p>
        <p>Genres: {genres}</p>
        <p>Publish: {date}</p>
        <div className="card-actions justify-end">
          <Link
            to={`gameDetails/${_id}`}
            className="btn bg-[#6e83b7] text-white"
          >
            Explore Details
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ReviewCard;
