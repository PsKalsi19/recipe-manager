/* eslint-disable react/prop-types */
import { createContext, useEffect, useReducer } from "react";
import recipesData from "../db/recipe";
import { getRecipe, saveRecipe } from "../utility/localstorage-utility";

const RECIPE_ACTIONS = {
  SET_RECIPE: "set_recipe",
  UPDATE_RECIPE: "update_recipe",
};

const initialRecipeState = {
  recipes: [],
  searchText: "",
  filterBy: "name",
};

const recipeReducer = (state, { type, payload }) => {
  switch (type) {
    case RECIPE_ACTIONS.SET_RECIPE:
      return { ...state, recipes: payload };

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
      }}
    >
      {children}
    </RecipeContext.Provider>
  );
};

export default RecipeProvider;
