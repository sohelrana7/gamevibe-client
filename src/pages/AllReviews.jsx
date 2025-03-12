// import { useLoaderData } from "react-router-dom";
// import ReviewCard from "../components/ReviewCard";

// const AllReviews = () => {
//   const loadedReviews = useLoaderData();
//   // console.log(loadedReviews);
//   return (
//     <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 my-16">
//       {loadedReviews.map((review) => (
//         <ReviewCard key={review._id} review={review}></ReviewCard>
//       ))}
//     </div>
//   );
// };

// export default AllReviews;

import { useState } from "react";
import { useLoaderData } from "react-router-dom";
import ReviewCard from "../components/ReviewCard";

const AllReviews = () => {
  const loadedReviews = useLoaderData();
  const [reviews, setReviews] = useState(loadedReviews);
  const [sortType, setSortType] = useState("");
  const [selectedGenre, setSelectedGenre] = useState("");

  // Get unique genres for the filter dropdown
  const genres = [...new Set(loadedReviews.map((review) => review.genres))];

  // Sorting function
  const handleSortByRating = () => {
    const sortedReviews = [...reviews].sort((a, b) => {
      const ratingA = parseFloat(a.rating);
      const ratingB = parseFloat(b.rating);
      return ratingB - ratingA; // Sort descending
    });
    setReviews(sortedReviews);
    setSortType("rating");
  };

  // Filtering function
  const handleFilter = (genre) => {
    if (genre === "All") {
      setReviews(loadedReviews);
    } else {
      setReviews(loadedReviews.filter((review) => review.genres === genre));
    }
    setSelectedGenre(genre);
  };

  return (
    <div className="my-8">
      {/* Sorting and Filtering Controls */}
      <div className="flex justify-between items-center mb-6">
        {/* Sort Dropdown */}
        <select
          className="p-2 border rounded-md"
          onChange={handleSortByRating} // FIXED: Calls function directly
          value={sortType}
        >
          <option value="">Sort By</option>
          <option value="rating">Rating (High to Low)</option>
        </select>

        {/* Filter Dropdown */}
        <select
          className="p-2 border rounded-md"
          onChange={(e) => handleFilter(e.target.value)}
          value={selectedGenre}
        >
          <option value="All">All Genres</option>
          {genres.map((genre) => (
            <option key={genre} value={genre}>
              {genre}
            </option>
          ))}
        </select>
      </div>

      {/* Display Reviews */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {reviews.map((review) => (
          <ReviewCard key={review._id} review={review} />
        ))}
      </div>
    </div>
  );
};

export default AllReviews;
