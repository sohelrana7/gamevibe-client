import { useEffect, useState } from "react";
import { FaRegEdit } from "react-icons/fa";
import { TiDelete } from "react-icons/ti";
import { Link, useLoaderData } from "react-router-dom";
import Swal from "sweetalert2";

const MyReviews = () => {
  const [selectedReview, setSelectedReview] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const loadedReviews = useLoaderData();
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    setReviews(loadedReviews); // Set state when data loads
  }, [loadedReviews]);

  // console.log(reviews);
  // Open modal with selected review
  const handleEditClick = (review) => {
    setSelectedReview(review);
    setIsModalOpen(true);
  };

  // Handle review update with Swal
  const handleUpdateReview = async (event) => {
    event.preventDefault();
    const form = event.target;

    const updatedReview = {
      title: form.title.value,
      genres: form.genres.value,
      rating: form.rating.value,
      description: form.description.value,
      publish: form.publish.value,
      photo: form.photo.value,
    };

    const response = await fetch(
      `https://game-vibe-server.vercel.app/reviews/${selectedReview._id}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedReview),
      }
    );

    const updatedData = await response.json();

    if (response.ok) {
      // Update state with the new review data
      setReviews((prevReviews) =>
        prevReviews.map((review) =>
          review._id === selectedReview._id ? updatedData : review
        )
      );

      // Close modal
      setIsModalOpen(false);
      setSelectedReview(null);

      // Show success message
      Swal.fire({
        title: "Updated!",
        text: "Your review has been updated successfully.",
        icon: "success",
      });
    }
  };

  // Handle review delete with Swal confirmation
  const handleDeleteReview = async (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        const response = await fetch(
          `https://game-vibe-server.vercel.app/reviews/delete/${id}`,
          {
            method: "DELETE",
          }
        );

        if (response.ok) {
          // Remove deleted review from the state
          setReviews((prevReviews) =>
            prevReviews.filter((review) => review._id !== id)
          );

          Swal.fire({
            title: "Deleted!",
            text: "Your review has been deleted.",
            icon: "success",
          });
        }
      }
    });
  };

  return (
    <div className="overflow-x-auto">
      <table className="table table-zebra w-full">
        {/* Table Head */}
        <thead>
          <tr>
            <th>#</th>
            <th>Title</th>
            <th>Genres</th>
            <th>Rating</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {reviews?.map((item, index) => (
            <tr key={item._id}>
              <td>{index + 1}</td>
              <td>{item.title}</td>
              <td>{item.genres}</td>
              <td>{item.rating}</td>
              <td className="flex items-center gap-4">
                <button onClick={() => handleEditClick(item)}>
                  <FaRegEdit size={25} />
                </button>

                <button onClick={() => handleDeleteReview(item._id)}>
                  <TiDelete size={25} className="text-red-500" />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Edit Modal */}
      {isModalOpen && selectedReview && (
        <dialog open className="modal modal-bottom sm:modal-middle">
          <div className="modal-box">
            <h2 className="text-3xl font-semibold text-center mb-4 text-[#374151]">
              Update Review
            </h2>
            <form onSubmit={handleUpdateReview}>
              <div className="grid md:grid-cols-2 gap-6">
                {/* Left Column */}
                <div>
                  <label className="label">Game Title</label>
                  <input
                    type="text"
                    name="title"
                    defaultValue={selectedReview.title}
                    className="input input-bordered w-full"
                  />

                  <label className="label mt-3">Publishing Year</label>
                  <input
                    type="text"
                    name="publish"
                    defaultValue={selectedReview.publish}
                    className="input input-bordered w-full"
                  />

                  <label className="label mt-3">Genres</label>
                  <select
                    name="genres"
                    defaultValue={selectedReview.genres}
                    className="select select-bordered w-full"
                  >
                    <option value="" disabled>
                      Select one
                    </option>
                    <option value="Action">Action</option>
                    <option value="RPG">RPG</option>
                    <option value="Adventure">Adventure</option>
                  </select>
                </div>

                {/* Right Column */}
                <div>
                  <label className="label">Rating</label>
                  <input
                    type="text"
                    name="rating"
                    defaultValue={selectedReview.rating}
                    className="input input-bordered w-full"
                  />

                  <label className="label mt-3">Description</label>
                  <textarea
                    name="description"
                    defaultValue={selectedReview.description}
                    className="textarea textarea-bordered w-full h-28"
                  />
                </div>
              </div>

              <div className="mt-6">
                <label className="label">Game Cover Image</label>
                <input
                  type="text"
                  name="photo"
                  defaultValue={selectedReview.photo}
                  className="input input-bordered w-full"
                />
              </div>

              <div className="mt-6">
                <button
                  type="submit"
                  className="btn bg-[#6e83b7] text-white w-full py-3 text-lg"
                >
                  Update Review
                </button>
              </div>
            </form>

            <div className="modal-action">
              <button className="btn" onClick={() => setIsModalOpen(false)}>
                Close
              </button>
            </div>
          </div>
        </dialog>
      )}
    </div>
  );
};

export default MyReviews;
