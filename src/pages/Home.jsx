import { useContext } from "react";
import { RecipeContext } from "../context/RecipeProvider";
import Filters from "../components/Filters";

const Home = () => {
    const {recipeState, recipeDispatch}=useContext(RecipeContext);
    console.log(recipeState);
    return (
        <div className="px-16 my-32">
            <Filters/>
        </div>
    );
};

export default Home;