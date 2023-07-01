import { PlusCircleIcon } from "@heroicons/react/24/outline";
import { useContext } from "react";
import { RecipeContext } from "../context/RecipeProvider";
import Filters from "../components/Filters";
import RecipeCard from "../components/RecipeCard";

const Home = () => {
  const {
    recipeState: { recipes, searchText, filterBy },
    setIsDialogOpen,
  } = useContext(RecipeContext);

  const filtersBy = () => {
    if (searchText === "") return recipes;
    if (filterBy === "ingredients") {
      return recipes.filter((recipe) =>{
        return recipe.ingredients.some((ingredient) =>
          ingredient.toLowerCase().includes(searchText.trim().toLowerCase())
        )}
      );
    }
    return recipes.filter((recipe) =>
      recipe[filterBy].toLowerCase().includes(searchText.toLowerCase())
    );
  };
  return (
    <div className="px-16 my-32">
      <Filters />
      <h2 className="sm:text-4xl text-2xl font-bold my-8 text-gray-700">
        All Recipes:
      </h2>
      <div className="grid grid-cols-4 items-start gap-8">
        {recipes &&
          recipes.length > 0 &&
          filtersBy().map((ele, index) => (
            <RecipeCard key={index} recipe={ele} />
          ))}

        <div className="flex justify-center items-center align-middle flex-col">
          <PlusCircleIcon
            onClick={() =>
              setIsDialogOpen((prevVals) => ({ ...prevVals, openDialog: true }))
            }
            className="h-20 cursor-pointer hover:text-gray-700 my-auto w-20 text-gray-500"
          />
        </div>
      </div>
    </div>
  );
};

export default Home;
