/* eslint-disable react/prop-types */
import { createContext, useReducer } from "react";
import recipesData from "../db/recipe";

const initialRecipeState = {
  recipes: recipesData,
  searchText: "",
  filterBy: "name",
};

const recipeReducer = (state, { type, payload }) => {
  switch (type) {
    case "":
      return state;

    default:
      return state;
  }
};
export const RecipeContext = createContext();
const RecipeProvider = ({ children }) => {
  const [recipeState, recipeDispatch] = useReducer(
    recipeReducer,
    initialRecipeState
  );
  return (
    <RecipeContext.Provider
      value={{
        recipeState,
        recipeDispatch,
      }}
    >
      {children}
    </RecipeContext.Provider>
  );
};

export default RecipeProvider;
