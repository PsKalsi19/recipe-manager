const RECIPES = "recipe";

export const saveRecipe = (payload) =>
  localStorage.setItem(RECIPES, JSON.stringify(payload));

export const getRecipe = () => JSON.parse(localStorage.getItem(RECIPES)) ?? [];
