import { Favorites } from "./components/Favorites";
import { Meals } from "./components/Meals";
import { Modal } from "./components/Modal";
import { Search } from "./components/Search";

import "./App.css";
import { useGlobalContext } from "./context";

export function App() {
  const { showModal, favorite } = useGlobalContext();

  return (
    <main>
      <Search />
      {favorite.length > 0 && <Favorites />}
      <Meals />
      {showModal && <Modal />}
    </main>
  )
}