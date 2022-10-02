import "../styles/globals.css";
import Script from "next/script";
import Footer from "../components/Footer/Footer";
import NavigationBar from "../components/NavigationBar/NavigationBar";
import { AuthContextProvider } from "../context/AuthContext";
import Cart from "../components/Cart/Cart";
import CartProvider from "../hooks/CartProvider";
import { useState } from "react";

function MyApp({ Component, pageProps }) {
  const [cartIsShown, setCartIsShown] = useState(false);

  const showCartHandler = () => {
    setCartIsShown(true);
  };

  const hideCartHandler = () => {
    setCartIsShown(false);
  };

  return (
    <>
      <Script
        src="https://cdn.jsdelivr.net/npm/bootstrap@5.2.1/dist/js/bootstrap.bundle.min.js"
        integrity="sha384-u1OknCvxWvY5kfmNBILK2hRnQC3Pr17a+RTT6rIHI7NnikvbZlHgTPOOmMi466C8"
        crossorigin="anonymous"
      ></Script>
      <CartProvider>
        <AuthContextProvider>
          {cartIsShown && <Cart onClose={hideCartHandler} />}
          <NavigationBar onShowCart={showCartHandler}/>
          <Component {...pageProps} />
          <Footer />
        </AuthContextProvider>
      </CartProvider>
    </>
  );
}

export default MyApp;
