import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";

const AppContext = createContext();

const allMealsUrl = "https://www.themealdb.com/api/json/v1/1/search.php?s=a";
const randomMealUrl = "https://www.themealdb.com/api/json/v1/1/random.php";

function AppProvider({ children }) {
  const [meals, setMeals] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [selectedMeal, setSelectedMeal] = useState(null);
  const [favorite, setFavorite] = useState([]);

  const [loading, setLoading] = useState(false);

  function selectMeal(idMeal, favoriteMeal) {
    let meal;

    meal = meals.find((meal) => meal.idMeal === idMeal);

    setSelectedMeal(meal);
    setShowModal(true);
  }

  function addFavorite(idMeal) {
    const meal = meals.find((meal) => meal.idMeal === idMeal);
    const alreadyFavorite = favorite.find((meal) => meal.idMeal === idMeal);
    if(alreadyFavorite) {
      return;
    }

    const updateFavorite = [...favorite, meal];
    setFavorite(updateFavorite);

    localStorage.setItem("favorite", JSON.stringify(updateFavorite));
  }

  function removeFavorite(idMeal) {
    const updateFavorite = favorite.filter((meal) => meal.idMeal !== idMeal);
    setFavorite(updateFavorite);
    localStorage.setItem("favorite", JSON.stringify(updateFavorite));
  }

  function getFavoritesFromLocalStorage() {
    const favorite = localStorage.getItem("favorite");
    if(favorite) {
      setFavorite(JSON.parse(localStorage.getItem("favorite")));
    } else {
      setFavorite([]);
    }
    return favorite;
  }


  function closeModal() {
    setShowModal(false);
  }

  const fetchData = async (url) => {
    setLoading(true);
    try {
      const { data } = await axios(url);
      if (data.meals) {
        setMeals(data.meals);
      } else {
        setMeals([]);
      }

      console.log(data);
    } catch (error) {
      console.log(error.response);
    }
    setLoading(false);
  };

  function fetchRandomMeal() {
    fetchData(randomMealUrl);
  }

  useEffect(() => {
    fetchData(allMealsUrl);
  }, []);

  useEffect(() => {
    fetchData(`${allMealsUrl}${searchTerm}`);
  }, [searchTerm]);

  return (
    <AppContext.Provider
      value={{
        meals,
        loading,
        setSearchTerm,
        fetchRandomMeal,
        showModal,
        selectMeal,
        selectedMeal,
        closeModal,
        favorite,
        addFavorite,
        removeFavorite
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export const useGlobalContext = () => {
  return useContext(AppContext);
};

export { AppContext, AppProvider };
