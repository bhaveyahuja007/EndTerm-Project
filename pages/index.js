import Head from "next/head";
import Image from "next/image";
import Header from "../components/Header";
import SearchBar from "../components/SearchBar";
import styles from "../styles/Home.module.css";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";

export default function Home() {
  return (
    <div className={styles.image}>
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
      <Header />
      <SearchBar />
    </div>
  );
}
