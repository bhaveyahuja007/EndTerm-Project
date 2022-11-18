import Link from "next/link";
import React, { useEffect, useState } from "react";

function SearchShowCard(props) {
  const [added, setAdded] = useState(false);

  useEffect(() => {
    let cart = sessionStorage.getItem("cart");
    if (cart) {
      cart = JSON.parse(cart);
      if (cart.includes(props.id)) {
        setAdded(true);
      }
    }
  }, []);

  return (
    <div
      key={props.id}
      className="text-white flex flex-row justify-between space-x-10 w-auto py-3 bg-gray-900 rounded-md"
    >
      <div className="px-4">
        <img src={props.image} className="h-36" />
      </div>
      <div className="flex flex-col justify-around text-center">
        <div>{props.title}</div>
        <div className="">
          <Link href={`/show/${props.id}`}>
            <button
              className="border-2 border-white rounded-md px-24 bg-orange-500 hover:text-orange-500 hover:bg-white hover:border-orange-500
            "
            >
              Details 💪
            </button>
          </Link>
        </div>
        <div>
          {!added && (
            <button
              onClick={() => {
                setAdded(true);
                props.addToCart(props.id);
              }}
              className="border-2 border-white rounded-md px-14 bg-green-500 hover:bg-white hover:text-green-500 hover:border-green-500"
            >
              Add to my Favourites 🧡
            </button>
          )}
          {added && (
            <button
              onClick={() => {
                setAdded(false);
                props.removeFromCart(props.id);
              }}
              className="border-2 border-white rounded-md px-14 bg-red-500 hover:bg-white hover:text-red-500 hover:border-red-500"
            >
              Remove from my Favourites 🖤
            </button>
          )}
        </div>
      </div>
      <hr className="bg-white h-2"></hr>
    </div>
  );
}

export default SearchShowCard;
