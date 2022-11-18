import Link from "next/link";
import React from "react";

function Header() {
  return (
    <div className="flex flex-row justify-between bg-pink-500 items-center text-white py-2">
      <div className="text-4xl font-extrabold ml-4">Tv Shows</div>
      <div className="flex flex-row justify-around text-2xl space-x-5 mr-4 font-semibold">
        <Link href={"/"}>
          <div className="hover:cursor-pointer">Home</div>
        </Link>
        <Link href={"/favourites"}>
          <div className="hover:cursor-pointer">Favourites</div>
        </Link>
      </div>
    </div>
  );
}

export default Header;
