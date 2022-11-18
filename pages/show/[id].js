import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { ToastContainer } from "react-toastify";
import Header from "../../components/Header";
import styles from "../../styles/Home.module.css";
import { showErrorToast, showSuccessToast } from "../../utils/functions";
import "react-toastify/dist/ReactToastify.css";

function Show() {
  const router = useRouter();
  const [info, setInfo] = useState({
    image: "",
    title: "",
    id: "",
  });

  const params = router.query;
  console.log("params are ", params);

  const dataFetcher = async () => {
    console.log("fetching for ", `https://api.tvmaze.com/shows/${params.id}`);

    let responseData = await fetch(`https://api.tvmaze.com/shows/${params.id}`);

    console.log("res is ", responseData);

    let show = await responseData.json();
    console.log("show is ", show);
    let { id, image, name } = show;
    setInfo({
      image:
        (image && image.medium) ||
        "https://upload.wikimedia.org/wikipedia/commons/thumb/6/65/No-Image-Placeholder.svg/1200px-No-Image-Placeholder.svg.png",
      id,
      title: name,
    });
    productState();
    return;
  };

  const [added, setAdded] = useState(false);

  useEffect(() => {
    if (!router.isReady) return;
    dataFetcher();
  }, [router.isReady]);

  const productState = () => {
    let cart = sessionStorage.getItem("cart");
    if (cart) {
      cart = JSON.parse(cart);
      console.log("cart is ", cart, " with id ", params.id);
      console.log("search result is ", cart.indexOf(parseInt(params.id)));
      if (cart.indexOf(parseInt(params.id)) != -1) {
        console.log("located");
        setAdded(true);
      }
    }
  };

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
    setAdded(true);

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

    setAdded(false);

    return;
  };

  return (
    <div className={styles.image}>
      <Header />

      <div>
        <div className="container-main flex flex-col items-center justify-center mt-24">
          <div className="upper-box bg-red-700 h-40 rounded-t w-1/2"></div>
          <div className="lower bg-black w-1/2 flex flex-col justify-center items-center space-y-4 pb-4">
            <img
              src={info.image}
              className={` -mt-24 border-4 h-72 w-fit border-black ${styles.logo}`}
            />
            <div className="text-white text-3xl font-extrabold  text-center">
              {info.title}
            </div>

            <div className="">
              {added && (
                <button
                  onClick={() => {
                    removeFromCart(info.id);
                  }}
                >
                  💔
                </button>
              )}

              {!added && (
                <button
                  onClick={() => {
                    addToCart(info.id);
                  }}
                >
                  ❤️
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
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

export default Show;
