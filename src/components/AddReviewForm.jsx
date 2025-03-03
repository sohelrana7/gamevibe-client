import { useContext } from "react";
import { Link } from "react-router-dom"; // If using React Router
import Swal from "sweetalert2";
import AuthContext from "../context/AuthContext";
const AddReviewForm = () => {
  const { user } = useContext(AuthContext);
  const handleAddReview = (e) => {
    e.preventDefault();
    const form = e.target;
    const name = form.name.value;
    const email = form.email.value;
    const title = form.title.value;
    const rating = form.rating.value;
    const date = form.publish.value;
    const description = form.description.value;
    const genres = form.genres.value;
    const photo = form.photo.value;
    console.log(name, email, title, rating, date, description, genres, photo);
    const newReview = {
      name,
      email,
      title,
      rating,
      date,
      description,
      genres,
      photo,
    };

    fetch("http://localhost:5000/reviews", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(newReview),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if (data.insertedId) {
          Swal.fire({
            title: "Success",
            text: "successfully review added",
            icon: "success",
            confirmButtonText: "Cool",
          });
          form.reset();
        }
      });
  };
  return (
    <div className="min-h-screen bg-[url('https://i.ibb.co.com/LXGJkJyQ/11.png')] bg-cover bg-center bg-no-repeat flex flex-col items-center justify-center px-4">
      {/* Form Container */}
      <div className="bg-[#F4F3F0] p-10 rounded-lg shadow-lg max-w-4xl w-full">
        <h2 className="text-3xl font-semibold text-center mb-4 text-[#374151] font-rancho">
          Add New Review
        </h2>
        <p className="text-center text-xs font-raleway text-gray-600 mb-6">
          It is a long established fact that a reader will be distracted by
          readable content.
        </p>

        <form onSubmit={handleAddReview}>
          <div className="grid md:grid-cols-2 gap-6">
            {/* Left Column */}
            <div>
              <label className="label">User Name</label>
              <input
                type="text"
                name="name"
                defaultValue={user?.displayName}
                placeholder="Enter Your name"
                className="input input-bordered w-full"
              />

              <label className="label">Game Title</label>
              <input
                type="text"
                name="title"
                placeholder="Enter game title"
                className="input input-bordered w-full"
              />
              <label className="label mt-3">Publishing Year</label>
              <input
                type="text"
                name="publish"
                placeholder="Enter publishing year"
                className="input input-bordered w-full"
              />
              <label className="label mt-3">Genres</label>
              <select name="genres" className="select select-bordered w-full">
                <option value="" disabled selected>
                  Select one
                </option>
                <option value="Action">Action</option>
                <option value="RPG">RPG</option>
                <option value="Adventure">Adventure</option>
              </select>
            </div>

            {/* Right Column */}
            <div>
              <label className="label">User Email</label>
              <input
                type="text"
                name="email"
                defaultValue={user?.email}
                placeholder="Enter your email"
                className="input input-bordered w-full"
              />

              <label className="label">Rating</label>
              <input
                type="text"
                name="rating"
                placeholder="Enter rating"
                className="input input-bordered w-full"
              />

              <label className="label mt-3">Description</label>
              <textarea
                name="description"
                placeholder="Enter game description"
                className="textarea textarea-bordered w-full h-28"
              />
            </div>
          </div>

          {/* Full-Width Photo Input */}
          <div className="mt-6">
            <label className="label">Game Cover Image</label>
            <input
              type="text"
              name="photo"
              placeholder="Enter photo URL"
              className="input input-bordered w-full"
            />
          </div>

          {/* Full-Width Submit Button */}
          <div className="mt-6">
            <button
              type="submit"
              className="btn bg-[#D2B48C] text-[#331A15] font-rancho w-full py-3 text-lg"
            >
              Add Review
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddReviewForm;
