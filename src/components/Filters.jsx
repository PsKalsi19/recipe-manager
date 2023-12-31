import { useContext } from "react";
import { RecipeContext } from './../context/RecipeProvider';
import RECIPE_ACTIONS from "../utility/RecipeActions";

const Filters = () => {
  const filtersType = ["name", "ingredients", "cuisine"];
  const {recipeState, recipeDispatch}=useContext(RecipeContext)
  const {searchText,filterBy}=recipeState
  const handleOnSearch=(e)=>{
    recipeDispatch({type:RECIPE_ACTIONS.SET_SEARCH,payload:e.target.value})
  }
  const handleRadioChange=(e)=>{
    recipeDispatch({type:RECIPE_ACTIONS.SET_FILTER,payload:e.target.value})
  }
  return (
    <div className="bg-gray-800">
      <div className="relative grid grid-cols-4">
        <div>
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <svg
                aria-hidden="true"
                className="w-5 h-5 text-gray-400"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                  clipRule="evenodd"
                ></path>
              </svg>
            </div>
            <input
              type="search"
              onChange={handleOnSearch}
              value={searchText}
              id="search"
              className="border  text-gray-100 text-lg  block w-full pl-10 py-5  bg-gray-700 border-gray-600 placeholder-gray-400"
              placeholder="Search"
            />
        </div>

        {
            filtersType.map((filter,index)=>
            <div key={index} className="flex items-center pl-4 border  rounded border-gray-700">
            <input id={filter} onChange={handleRadioChange} checked={filterBy===filter} type="radio" value={filter} name="filter-radio" className="w-4 h-4 text-indigo-600  ring-offset-gray-800 focus:ring-2  border-gray-600" />
            <label htmlFor={filter} className="w-full capitalize py-4 ml-2 text-sm font-medium  text-gray-300">{filter}</label>
        </div>)
        }
      </div>
    </div>
  );
};

export default Filters;
