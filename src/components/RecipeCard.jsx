/* eslint-disable react/prop-types */
import { useContext } from "react";
import { Link } from "react-router-dom";
import { RecipeContext } from "../context/RecipeProvider";

const RecipeCard = ({ recipe }) => {
  const { handleDelete } = useContext(RecipeContext);
 
  const { name, cuisine, image, description,id } = recipe;
  return (
    <div className="max-w-sm  border  rounded-lg shadow bg-gray-800 border-gray-700">
      <img className="rounded-t-lg h-60 w-full" src={image} alt={name} />
      <div className="p-5">
        <span className="text-xs font-medium mr-2 text-gray-100 px-2.5 py-0.5 rounded-full bg-indigo-600 ">
          {cuisine}
        </span>
        <h5 className="mb-2 mt-2 text-2xl font-bold tracking-tight text-gray-100">
          {name}
        </h5>
        <p className="mb-3 line-clamp-4 font-normal  text-gray-400">
          {description}
        </p>
        <div className="flex flex-row justify-around">
          <Link
            to="/details"
            state={recipe}
            className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-gray-100  rounded-lg focus:ring-4 focus:outline-none  bg-indigo-600 hover:bg-indigo-700 focus:ring-indigo-800"
          >
            See Recipe
            <svg
              aria-hidden="true"
              className="w-4 h-4 ml-2 -mr-1"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                clipRule="evenodd"
              ></path>
            </svg>
          </Link>
          <button
            onClick={() => handleDelete(id)}
            className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-gray-100  rounded-lg focus:ring-4 focus:outline-none  bg-red-500 hover:bg-red-600 focus:ring-red-800"
            type="button"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default RecipeCard;
