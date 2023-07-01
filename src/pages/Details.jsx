import { Link, useLocation } from "react-router-dom";

const Details = () => {
  const location = useLocation();
  const { cuisine, image, ingredients, instruction, name } = location.state;
  return (
    <div className="px-16 my-32">
          <div className="flex flex-row items-center justify-between">
              <h2 className="sm:text-4xl text-2xl font-bold my-8 text-gray-700">
                Recipe Details
              </h2>
              <Link className="px-3 py-2 text-sm h-fit font-medium text-center text-gray-100  rounded-lg focus:ring-4 focus:outline-none  bg-indigo-600 hover:bg-indigo-700 focus:ring-indigo-800" to="/">Home</Link>
          </div>
    <div className="grid gap-x-16 grid-cols-3">
      <div className="forImage col-span-1">
        <img src={image} alt={name} />
      </div>
      <div className=" col-span-2">
        <h3 className="text-4xl font-bold text-gray-700 my-4">{name}</h3>

        <p className="text-normal font-bold text-gray-700 my-4">Instructions: {instruction}</p>
        <p className="text-normal font-bold text-gray-700 my-4">Cuisine: {cuisine}</p>

        <p className="text-normal font-bold text-gray-700 mt-4">Ingredients:</p>
        <ul>
          {ingredients.map((ele, index) => (
            <li key={index}>{ele}</li>
          ))}
        </ul>
      </div>
    </div>
    </div>
  );
};

export default Details;
