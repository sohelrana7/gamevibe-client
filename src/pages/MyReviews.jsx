import { useLoaderData } from "react-router-dom";

const MyReviews = () => {
  const loadData = useLoaderData();
  console.log(loadData);
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
          {loadData.map((item, index) => (
            <tr key={item._id}>
              <td>{index + 1}</td>
              <td>{item.title}</td>
              <td>{item.genres}</td>
              <td>{item.rating}</td>
              <td>
                <button className="btn btn-primary btn-sm mr-2">Update</button>
                <button className="btn btn-error btn-sm">Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default MyReviews;
