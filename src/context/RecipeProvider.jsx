/* eslint-disable react/prop-types */
import { createContext, useEffect, useReducer, useState } from "react";
import recipesData from "../db/recipe";
import { getRecipe, saveRecipe } from "../utility/localstorage-utility";

import RECIPE_ACTIONS from "../utility/RecipeActions";

const initialRecipeState = {
  recipes: [],
  searchText: "",
  filterBy: "name",
};

const recipeReducer = (state, { type, payload }) => {
  switch (type) {
    case RECIPE_ACTIONS.SET_RECIPE:
      return { ...state, recipes: payload };
    case RECIPE_ACTIONS.SET_SEARCH:
      return { ...state, searchText: payload };
    case RECIPE_ACTIONS.SET_FILTER:
      return { ...state, filterBy: payload };
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

  let [isDialogOpen, setIsDialogOpen] = useState({
    openDialog: false,
    selectedRecipe: {},
  });

  const initializeData = () => {
    const allRecipes = getRecipe();
    if (allRecipes && allRecipes.length > 0) {
      recipeDispatch({ type: RECIPE_ACTIONS.SET_RECIPE, payload: allRecipes });
    } else {
      recipeDispatch({ type: RECIPE_ACTIONS.SET_RECIPE, payload: recipesData });
      saveRecipe(recipesData);
    }
  };

  useEffect(() => {
    initializeData();
  }, []);
  return (
    <RecipeContext.Provider
      value={{
        recipeState,
        recipeDispatch,
        isDialogOpen,
        setIsDialogOpen,
      }}
    >
      {children}
    </RecipeContext.Provider>
  );
};

export default RecipeProvider;
