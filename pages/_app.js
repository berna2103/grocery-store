import "../styles/globals.css";
import Script from "next/script";
import Footer from "../components/Footer/Footer";
import NavigationBar from "../components/NavigationBar/NavigationBar";
import { AuthContextProvider } from "../context/AuthContext";
import Cart from "../components/Cart/Cart";
import CartProvider from "../hooks/CartProvider";
import { useState } from "react";

import { CookiesProvider } from "react-cookie"

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
       
      {/* Firebase authentication ui */}
      <Script src="https://www.gstatic.com/firebasejs/ui/6.0.1/firebase-ui-auth.js">
      </Script>

      <CartProvider>
        <CookiesProvider>
        <AuthContextProvider>
          {cartIsShown && <Cart onClose={hideCartHandler} />}
          <NavigationBar onShowCart={showCartHandler}/>
          <Component {...pageProps} />
          <Footer />
        </AuthContextProvider>
        </CookiesProvider>
      </CartProvider>
    </>
  );
}

export default MyApp;
