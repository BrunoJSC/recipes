import { useState } from "react";
import { useGlobalContext } from "../context";

export function Search() {
  const [text, setText] = useState("");
  const { setSearchTerm, fetchRandomMeal } = useGlobalContext();

  function handleChange(e) {
    setText(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    console.log(text);
    
    if(text) {
      setSearchTerm(text);
      setText("");
    }
  }

  function handleRandomMeal() {
    setSearchTerm(text);
    setText("");
    fetchRandomMeal();
  }

  return (
    <header className="search-container">
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="type favorite meal"
          className="form-input"
          value={text}
          onChange={handleChange}
        />
        <button type="submit" className="btn">
          search
        </button>
        <button type="button" className="btn btn-hipster" onClick={handleRandomMeal}>
          Suprise me!
        </button>
      </form>
    </header>
  );
}
