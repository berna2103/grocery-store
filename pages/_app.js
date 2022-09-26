import "../styles/globals.css";
import Script from "next/script";
import Footer from "../components/Footer/Footer";
import NavigationBar from "../components/NavigationBar/NavigationBar";
import { AuthContextProvider } from "../context/AuthContext";

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Script
        src="https://cdn.jsdelivr.net/npm/bootstrap@5.0.0-beta1/dist/js/bootstrap.bundle.min.js"
        integrity="sha384-ygbV9kiqUc6oa4msXn9868pTtWMgiQaeYH7/t7LECLbyPA2x65Kgf80OJFdroafW"
        crossOrigin="anonymous"
      ></Script>
      <AuthContextProvider>
        <NavigationBar />
        <Component {...pageProps} />
        <Footer />
      </AuthContextProvider>
    </>
  );
}

export default MyApp;
