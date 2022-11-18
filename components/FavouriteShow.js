import Link from "next/link";
import React from "react";

function FavouriteShow(props) {
  return (
    <div className="flex flex-col space-y-2 bg-gray-900 w-fit text-white text-center pb-4 rounded shadow-xl">
      <div className="border-4 border-red-600 w-fit rounded-t">
        <img src={props.image} className="h-80"></img>
      </div>
      <div className="text-xl font-extrabold">{props.title}</div>
      <div
        className="hover:cursor-pointer"
        onClick={() => {
          props.removeFromCart(props.id);
        }}
      >
        ❤️
      </div>
      <div>
        <Link href={`/show/${props.id}`}>
          <button className="border-2 border-white rounded px-4">
            Details
          </button>
        </Link>
      </div>
    </div>
  );
}

export default FavouriteShow;
