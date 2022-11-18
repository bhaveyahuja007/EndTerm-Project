import React, { useState } from "react";
import { showErrorToast, showSuccessToast } from "../utils/functions";
import SearchShowCard from "./SearchShowCard";

function SearchBar() {
  const [searchResults, setSearchResults] = useState([]);
  const [searchVal, setSearchVal] = useState("");
  const [loading, setLoading] = useState(false);

  const addToCart = (id) => {
    let cart = sessionStorage.getItem("cart");
    if (cart) {
      cart = JSON.parse(cart);
    } else {
      cart = [];
    }

    cart.push(id);
    sessionStorage.setItem("cart", JSON.stringify(cart));
    showSuccessToast(`Added ${id} To Cart`);
    return;
  };

  const removeFromCart = (id) => {
    let cart = sessionStorage.getItem("cart");
    cart = JSON.parse(cart);
    const index = cart.indexOf(id);
    if (index > -1) {
      // only splice array when item is found
      cart.splice(index, 1); // 2nd parameter means remove one item only
    }
    sessionStorage.setItem("cart", JSON.stringify(cart));
    showErrorToast(`Removed ${id} from Cart`);

    return;
  };

  const dataFetcher = async (key) => {
    try {
      setLoading(true);
      let response = await fetch(
        `https://api.tvmaze.com/search/shows?q=${key}`
      );
      let data = await response.json();

      console.log("data is ", data);
      let finalData = [];
      data.map((obj) => {
        let show = obj.show;
        let { id, image, name } = show;
        let tempObj = {
          id,
          image:
            (image && image.medium) ||
            "https://upload.wikimedia.org/wikipedia/commons/thumb/6/65/No-Image-Placeholder.svg/1200px-No-Image-Placeholder.svg.png",
          title: name,
        };
        finalData.push(tempObj);
      });

      setSearchResults(finalData);
      setLoading(false);
      return;
    } catch (e) {
      console.log("error in fetching data  ", e);
      return;
    }
  };

  return (
    <div className="flex flex-col justify-center mt-24 items-center">
      <input
        type={"text"}
        placeholder="Example: Superman"
        value={searchVal}
        onChange={(e) => {
          setSearchVal(e.target.value);
          dataFetcher(e.target.value);
        }}
        className="rounded-full bg-blue-400 h-14 w-1/2 border-yellow-500 border-4 placeholder:text-white text-white text-center active:border-yellow-600 outline-none"
      />

      <div className="flex flex-col space-y-4 mt-4 mb-4">
        {!loading &&
          searchResults.map((item) => {
            return (
              <SearchShowCard
                key={item.id}
                image={item.image}
                title={item.title}
                id={item.id}
                addToCart={addToCart}
                removeFromCart={removeFromCart}
              ></SearchShowCard>
            );
          })}

        {loading && <div className="text-white">Loading!!!</div>}
      </div>
    </div>
  );
}

export default SearchBar;
