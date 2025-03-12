import React from "react";
import Banner from "../../components/Banner";
import { useLoaderData } from "react-router-dom";
import ReviewCard from "../../components/ReviewCard";

const Home = () => {
  const loadedReviews = useLoaderData();
  console.log(loadedReviews);
  return (
    <div>
      <Banner></Banner>
      {/* highest rated game  */}

      <div className="my-10">
        <div className="bg-[#F4F3F0] p-10 rounded-lg shadow-lg">
          <h2 className="text-3xl font-semibold text-center mb-4 text-[#374151] font-rancho">
            Highest Rated Games
          </h2>
          <p className="text-center text-xs font-raleway text-gray-600 mb-6">
            Discover the top-rated games loved by players! Explore their details
            and find your next favorite adventure.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 my-16">
            {loadedReviews.map((review) => (
              <ReviewCard key={review._id} review={review}></ReviewCard>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
