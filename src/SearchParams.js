import React, { useState, useEffect } from "react";
import pet, { ANIMALS } from "@frontendmasters/pet";
import useDropdown from "./useDropdown";

const SearchParams = () => {
  const [location, setLocation] = useState("Seatle, WA");
  const [breeds, setBreeds] = useState([]);
  const [animal, AnimalDropdown] = useDropdown("animals", "dog", ANIMALS);
  const [breed, BreedDropdown, setBreed] = useDropdown("Breed", "", breeds);

  useEffect(() => {
    setBreeds([]);
    setBreed("");
    pet.breeds(animal).then(({ breeds }) => {
      const breedStr = breeds.map(({ name }) => name);
      setBreeds(breedStr);
    }, console.error);
  }, [animal, setBreed, setBreeds]);

  return (
    <div id="search-params" className="search-params">
      <h1>{location}</h1>
      <form>
        <label htmlFor="Location">
          Location
          <input
            type="text"
            placeholder="Location"
            id="location"
            value={location}
            onChange={event => setLocation(event.target.value)}
          />
        </label>
        <AnimalDropdown />
        <BreedDropdown />
        <button>Submit</button>
      </form>
    </div>
  );
};

export default SearchParams;