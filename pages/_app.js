import "../styles/globals.css";
import Script from "next/script";
import Footer from "../components/Footer/Footer";
import NavigationBar from "../components/NavigationBar/NavigationBar";
import { AuthContextProvider } from "../context/AuthContext";

function MyApp({ Component, pageProps }) {
  return (
    <>

<Script src="https://cdn.jsdelivr.net/npm/bootstrap@5.2.1/dist/js/bootstrap.bundle.min.js" integrity="sha384-u1OknCvxWvY5kfmNBILK2hRnQC3Pr17a+RTT6rIHI7NnikvbZlHgTPOOmMi466C8" crossorigin="anonymous"></Script>

      <AuthContextProvider>
        <NavigationBar />
        <Component {...pageProps} />
        <Footer />
      </AuthContextProvider>
    </>
  );
}

export default MyApp;
