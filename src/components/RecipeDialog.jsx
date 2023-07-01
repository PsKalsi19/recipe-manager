import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useContext, useState } from "react";
import { RecipeContext } from "../context/RecipeProvider";
import RECIPE_ACTIONS from "../utility/RecipeActions";
import { saveRecipe } from "../utility/localstorage-utility";

const RecipeDialog = () => {
  const {
    isDialogOpen: { openDialog, selectedRecipe },
    setIsDialogOpen,
    recipeState,
    recipeDispatch,
  } = useContext(RecipeContext);
  const closeModal = () => {
    setIsDialogOpen((prevValue) => ({ ...prevValue, openDialog: false }));
  };

  const initialForm = {
    name: "",
    cuisine: "",
    ingredients: [],
    image: "",
    instruction: "",
  };
  const [formState, setFormState] = useState(initialForm);
  const { name, cuisine, ingredients, image, instruction } = formState;

  const handleFormSubmit = (e) => {
    e.preventDefault();
    recipeDispatch({
      type: RECIPE_ACTIONS.SET_RECIPE,
      payload: [...recipeState.recipes, formState],
    });
    saveRecipe([...recipeState.recipes, formState]);
    setFormState(initialForm);
    closeModal();
  };

  const handleOnChange = (e) => {
    let forIngredients = [];
    if (e.target.name === "ingredients") {
      forIngredients = e.target.value.split(",");
      setFormState((prevValues) => ({
        ...prevValues,
        [e.target.name]: forIngredients,
      }));
      return;
    }
    setFormState((prevValues) => ({
      ...prevValues,
      [e.target.name]: e.target.value,
    }));
  };
  return (
    <>
      <Transition appear show={openDialog} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={closeModal}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-25" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full  items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-lg transform overflow-scroll h-100 rounded-2xl bg-gray-100 p-6 text-left align-middle shadow-xl transition-all">
                  <Dialog.Title
                    as="h3"
                    className="text-lg font-medium leading-6 text-gray-900"
                  >
                    {Object.keys(selectedRecipe).length > 0
                      ? "Edit Recipe"
                      : "Add Recipe"}
                  </Dialog.Title>

                  <form onSubmit={handleFormSubmit}>
                    <div className="mb-6">
                      <label
                        htmlFor="name"
                        className="block mb-2 text-sm capitalize font-medium text-gray-700"
                      >
                        Name
                      </label>
                      <input
                        type="name"
                        name="name"
                        value={name}
                        onChange={handleOnChange}
                        id="name"
                        className="shadow-sm  border  text-sm rounded-lg  focus:border-gray-500 block w-full p-2.5 bg-gray-900 border-gray-600 placeholder-gray-400 text-white shadow-sm-light"
                        required
                      />
                    </div>
                    <div className="mb-6">
                      <label
                        htmlFor="cuisine"
                        className="block mb-2 capitalize text-sm font-medium text-gray-700"
                      >
                        cuisine
                      </label>
                      <input
                        type="text"
                        id="cuisine"
                        name="cuisine"
                        value={cuisine}
                        onChange={handleOnChange}
                        className="shadow-sm  border  text-sm rounded-lg  focus:border-gray-500 block w-full p-2.5 bg-gray-900 border-gray-600 placeholder-gray-400 text-white shadow-sm-light"
                        required
                      />
                    </div>
                    <div className="mb-6">
                      <label
                        htmlFor="ingredients"
                        className="block capitalize mb-2 text-sm font-medium text-gray-700"
                      >
                        ingredients ({`Add coma for multiple ingredients `})
                      </label>
                      <textarea
                        className="shadow-sm resize-none border text-sm rounded-lg  focus:border-gray-500 block w-full p-2.5 bg-gray-900 border-gray-600 placeholder-gray-400 text-white shadow-sm-light"
                        required
                        value={ingredients}
                        onChange={handleOnChange}
                        name="ingredients"
                        id="ingredients"
                        placeholder="Apple, Milk, Sugar, Syrup"
                        cols="20"
                        rows="5"
                      ></textarea>
                    </div>
                    <div className="mb-6">
                      <label
                        htmlFor="instruction"
                        className="block capitalize mb-2 text-sm font-medium text-gray-700"
                      >
                        cooking instructions
                      </label>
                      <textarea
                        className="shadow-sm resize-none border text-sm rounded-lg  focus:border-gray-500 block w-full p-2.5 bg-gray-900 border-gray-600 placeholder-gray-400 text-white shadow-sm-light"
                        required
                        value={instruction}
                        onChange={handleOnChange}
                        name="instruction"
                        id="instruction"
                        cols="20"
                        rows="5"
                      ></textarea>
                    </div>

                    <div className="mb-6">
                      <label
                        htmlFor="image"
                        className="block capitalize mb-2 text-sm font-medium text-gray-700"
                      >
                        Image URL
                      </label>
                      <input
                        type="url"
                        id="image"
                        name="image"
                        placeholder="https://image-url"
                        value={image}
                        onChange={handleOnChange}
                        className="shadow-sm  border  text-sm rounded-lg  focus:border-gray-500 block w-full p-2.5 bg-gray-900 border-gray-600 placeholder-gray-400 text-white shadow-sm-light"
                        required
                      />
                    </div>

                    <button
                      type="submit"
                      className="text-white focus:ring-4 focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 text-center bg-indigo-600 hover:bg-indigo-700 focus:ring-indigo-800"
                    >
                      Add Recipe
                    </button>
                  </form>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
};

export default RecipeDialog;
