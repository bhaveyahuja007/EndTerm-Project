import React, { useEffect, useState } from "react";
import { ToastContainer } from "react-toastify";
import FavouriteShow from "../components/FavouriteShow";
import Header from "../components/Header";
import styles from "../styles/Home.module.css";
import { showErrorToast } from "../utils/functions";
import "react-toastify/dist/ReactToastify.css";

function Favourites() {
  const [shows, setShows] = useState([]);
  const [loading, setLoading] = useState(false);
  const dataFetcher = async () => {
    console.log("running data fetcher");
    setLoading(true);
    let cart = sessionStorage.getItem("cart");
    if (cart) {
      cart = JSON.parse(cart);
      let finalData = [];
      await Promise.all(
        cart.map(async (id) => {
          let response = await fetch(`https://api.tvmaze.com/shows/${id}`);
          let show = await response.json();
          let { id: showId, image, name } = show;
          let tempObj = {
            id: showId,
            image:
              (image && image.medium) ||
              "https://upload.wikimedia.org/wikipedia/commons/thumb/6/65/No-Image-Placeholder.svg/1200px-No-Image-Placeholder.svg.png",
            title: name,
          };
          finalData.push(tempObj);
        })
      );
      setShows(finalData);
      console.log("final data is ", finalData);
      setLoading(false);
    }
  };

  const removeFromCart = (id) => {
    let cart = sessionStorage.getItem("cart");
    cart = JSON.parse(cart);
    const index = cart.indexOf(id);
    if (index > -1) {
      // only splice array when item is found
      cart.splice(index, 1); // 2nd parameter means remove one item only
    }

    let currState = shows;
    currState = currState.filter((a) => {
      return a.id != id;
    });
    setShows(currState);
    sessionStorage.setItem("cart", JSON.stringify(cart));
    showErrorToast(`Removed ${id} from Cart`);
    return;
  };
  useEffect(() => {
    dataFetcher();
  }, []);

  return (
    <div className={styles.image}>
      <Header />

      {!loading && (
        <div className="py-4 px-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-y-4 gap-x-2">
          {shows.map((item) => {
            return (
              <FavouriteShow
                key={item.id}
                title={item.title}
                image={item.image}
                id={item.id}
                removeFromCart={removeFromCart}
              ></FavouriteShow>
            );
          })}
        </div>
      )}

      <ToastContainer
        className={"text-sm font-sans"}
        position="top-right"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </div>
  );
}

export default Favourites;
