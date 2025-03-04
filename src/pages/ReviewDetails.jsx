import { useContext } from "react";
import { Link, useLoaderData } from "react-router-dom";
import Swal from "sweetalert2";
import AuthContext from "../context/AuthContext";

const ReviewDetails = () => {
  const { user } = useContext(AuthContext);

  const loadedData = useLoaderData();
  const { _id, title, rating, description, genres, date, name, email, photo } =
    loadedData;

  const handleAddWatchList = () => {
    const watchListData = {
      user_name: user?.displayName,
      user_email: user?.email,
      title,
      rating,
      description,
      genres,
      date,
      name,
      email,
      photo,
    };
    console.log(watchListData);
    fetch("http://localhost:5000/watchLists", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(watchListData),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if (data.insertedId) {
          Swal.fire({
            title: "Added",
            text: "successfully watchList added",
            icon: "success",
            confirmButtonText: "Cool",
          });
        }
      });
  };
  return (
    <div className="card bg-base-100 shadow-sm my-12">
      <figure>
        <img className="" src={photo} alt="Shoes" />
      </figure>
      <div className="card-body">
        <h2 className="card-title">{title}</h2>
        <div className="grid grid-cols-2 gap-4">
          <div className="grid grid-cols-2 gap-2">
            <div>
              <div className="space-y-2">
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
              </div>
            </div>
            <div className="space-y-2">
              <p>Review's name: {name}</p>
              <p>Review's email: {email}</p>
            </div>
          </div>

          <div className="col-span-1">
            {" "}
            <p>Description: {description}</p>
          </div>
        </div>

        <div className="card-actions justify-end">
          <Link
            onClick={handleAddWatchList}
            className="btn bg-[#6e83b7] text-white"
          >
            Add to WatchList
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ReviewDetails;
